import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { Team } from "../models/team.models.js";
import { User } from "../models/user.models.js";
import {Task} from '../models/task.models.js'

const createTeam = asyncHandler(async (req, res, next) => {
    const { teamName, teamMembers } = req.body;
    const currentUser = req.user;

    if (!teamName) {
        return res.send(new apiError(400, "Please provide team name"));
    }

    function generateRandomString(length) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const randomString = generateRandomString(10);

    const existingTeam = await Team.findOne({ teamId: randomString });

    if (existingTeam) {
        randomString();
    }

    try {
        const teamDetails = await Team.create({
            teamName,
            teamId: randomString,
            teamMembers: [teamMembers, currentUser._id],
            teamAdmins: currentUser._id,
        });

        const user = await User.findById(currentUser._id);

        const teamid = teamDetails._id;

        user.teams.push(teamid);

        await user.save();

        return res.send(new apiResponse(201, "Team created successfully", teamDetails));
    } catch (error) {
        return res.send(new apiError(400, "Error creating team"));
    }
});

const deleteTeam = asyncHandler(async (req, res) => {
    const { teamId } = req.body;

    const team = await Team.findOne({ teamId });

    if (team.teamAdmins != req.user._id) {
        return res.send(new apiError(400, "You are not authorized to delete this team"));
    }

    const deleteTeam = await Team.findOneAndDelete({ teamId });

    return res.send(new apiResponse(200, "Team deleted successfully", deleteTeam));
});

const joinTeam = asyncHandler(async (req, res) => {
    const { teamName } = req.body;
    const team = await Team.findOne({ teamName:teamName });
    team.teamMembers.push(req.user._id);
    await team.save();
    const user = await User.findById(req.user._id);
    user.teams.push(team._id);

    await user.save();
    return res.send(new apiResponse(200, "Team joined successfully", team));
});

const getTeam = asyncHandler(async (req, res) => {
    const { teamId, assignTo } = req.query;

    try {
        const pipeline = await Team.aggregate([
            // Match the specific team by teamId
            {
                $match: {
                    teamId: teamId,
                },
            },
            // Lookup tasks associated with the team
            {
                $lookup: {
                    from: "tasks", // MongoDB collection for tasks
                    localField: "teamId", // teamId in Team schema
                    foreignField: "teamId", // teamId in Task schema
                    as: "teamTasks", // Output array of tasks
                },
            },
            // Unwind tasks to work with individual task objects
            {
                $unwind: {
                    path: "$teamTasks",
                    preserveNullAndEmptyArrays: true, // Optional: retain teams without tasks
                },
            },
            // Lookup user information for each task
            {
                $lookup: {
                    from: "users", // MongoDB collection for users
                    localField: "teamTasks.assignTo", // AssignTo field in Task schema
                    foreignField: "_id", // _id in User schema (ObjectId reference)
                    as: "assignedUser", // Output array with user details
                },
            },
            // Unwind the user array (assuming each task is assigned to one user)
            {
                $unwind: {
                    path: "$assignedUser",
                    preserveNullAndEmptyArrays: true, // Optional: retain tasks without users
                },
            },
            // Optional projection to select only required fields
            {
                $project: {
                    teamName: 1,
                    "teamTasks.taskName": 1,
                    "teamTasks.taskDescription": 1,
                    "teamTasks.taskDueDate": 1,
                    "teamTasks.taskPriority": 1,
                    "assignedUser.userName": 1, // Show the assigned user name
                    "assignedUser.email": 1,
                    "teamTasks.taskStatus":1,
                    "teamTasks.assignTo":1
                    // Show the assigned user email
                },
            },
        ]);

        // Check if the pipeline returns results
        if (!pipeline || pipeline.length === 0) {
            return res.send(new apiResponse(404, "No tasks found for the team", {}));
        }

        // Return the result of the aggregation
        return res.send(new apiResponse(200, "Team tasks retrieved successfully", pipeline));
    } catch (error) {
        console.error("Error in aggregation:", error);
        return res.send(new apiError(400, "Pipeline Error"));
    }
});


export { createTeam, deleteTeam, joinTeam, getTeam };
