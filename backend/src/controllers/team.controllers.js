import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { Team } from "../models/team.models.js";
import { User } from "../models/user.models.js";
import {Task} from '../models/task.models.js'
import { ObjectId } from "mongodb";
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
    console.log(team);
    team.teamMembers.push(req.user._id);
    
    await team.save();
    const user = await User.findById(req.user._id);
    user.teams.push(team._id);

    await user.save();
    return res.send(new apiResponse(200, "Team joined successfully", team));
});




const getTeam = asyncHandler(async (req, res) => {
    const { teamId } = req.query;

    if (!teamId) {
        return res.status(400).json(new ApiError(400, "TeamId is required"));
    }

    try {
        const pipeline = [
            { $match: { teamId: teamId } },
            {
                $lookup: {
                    from: "tasks",
                    localField: "teamId",
                    foreignField: "teamId",
                    as: "teamTasks"
                }
            },
            { $unwind: { path: "$teamTasks", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "users",
                    localField: "teamTasks.assignTo",
                    foreignField: "_id",
                    as: "assignedUser"
                }
            },
            { $unwind: { path: "$assignedUser", preserveNullAndEmptyArrays: true } },
            {
                $group: {
                    _id: "$_id",
                    teamName: { $first: "$teamName" },
                    teamId: { $first: "$teamId" },
                    teamMembers: { $first: "$teamMembers" },
                    teamAdmins: { $first: "$teamAdmins" },
                    tasks: {
                        $push: {
                            $cond: [
                                { $ifNull: ["$teamTasks", false] },
                                {
                                    _id: "$teamTasks._id",
                                    taskName: "$teamTasks.taskName",
                                    taskDescription: "$teamTasks.taskDescription",
                                    taskDueDate: "$teamTasks.taskDueDate",
                                    taskPriority: "$teamTasks.taskPriority",
                                    taskStatus: "$teamTasks.taskStatus",
                                    assignedTo: {
                                        userId: "$assignedUser._id",
                                        userName: "$assignedUser.userName",
                                        email: "$assignedUser.email"
                                    }
                                },
                                "$$REMOVE"
                            ]
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    let: { memberIds: "$teamMembers" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [{ $toString: "$_id" }, "$$memberIds"]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                userName: 1,
                                email: 1
                            }
                        }
                    ],
                    as: "teamMembersDetails"
                }
            },
            {
                $project: {
                    _id: 1,
                    teamName: 1,
                    teamId: 1,
                    tasks: 1,
                    teamMembers: "$teamMembersDetails",
                    teamAdmins: 1
                }
            }
        ];

        const result = await Team.aggregate(pipeline);

        if (!result || result.length === 0) {
            return res.status(404).json(new apiResponse(404, "No team found with the given teamId", null));
        }
console.log(result[0]);

        return res.status(200).json(new apiResponse(200, "Team data retrieved successfully", result[0]));
    } catch (error) {
        console.error("Error in getTeam:", error);
        return res.status(500).json(new apiError(500, "Internal server error"));
    }
});


export { createTeam, deleteTeam, joinTeam, getTeam };
