import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { Team } from "../models/team.models.js";
import { Task } from "../models/task.models.js";
import { User } from "../models/user.models.js";
import mongoose from "mongoose";
import {ObjectId,MongoClient}from 'mongodb'

const createTask = asyncHandler(async (req, res, next) => {
  const {
    taskName,
    taskDescription,
    taskStatus,
    taskDueDate,
    taskPriority,
    teamId,
    assignTo,
  } = req.body;
  const currentUser = req.user;
  const team = await Team.findOne({ teamId });


  const isAdmin = currentUser._id == team.teamAdmins._id;

  if (!isAdmin) {
    return res.send(new apiError(400, "Only team admins can create tasks"));
  }

  const user = await User.findById(currentUser._id);

  if (
    !taskName ||
    !taskDescription ||
    !taskStatus ||
    !taskDueDate ||
    !taskPriority ||
    !teamId
  ) {
    return res.send(
      new apiError(
        400,
        "Please provide task name, task description, task status, task due date, task priority"
      )
    );
  }

  try {
    const taskDetails = await Task.create({
      taskName,
      taskDescription,
      taskStatus,
      taskDueDate,
      taskPriority,
      teamId,
      assignTo,
    });
    //console.log(taskDetails);
    return res.send(
      new apiResponse(201, "Task created successfully", taskDetails)
    );
  } catch (error) {
    return res.send(new apiError(400, "Error creating task", error));
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.query;
  const currentUser = req.user;

  const task = await Task.findById(taskId);
  const team = await Team.findOne({ teamId: task.teamId });
  if (currentUser._id != team.teamAdmins._id) {
    return res.send(new apiError(400, "Only team admins can delete tasks"));
  }

  await Task.findByIdAndDelete({ _id: taskId });
  return res.send(new apiResponse(200, "Task deleted successfully", task));
});

const updateTask = asyncHandler(async (req, res) => {
  const { taskStatus, taskID, teamId ,} = req.body;

  const currentUser = req.user;

  

  if (!taskStatus || !taskID) {
    return res.send(new apiError(400, "Please provide task Id"));
  }

    const task = await Task.findOne({_id:taskID});
     
  const team = await Team.findOne({ teamId: teamId });

  //console.log(task,team);
  
  const isAssigne = currentUser._id == task.assignTo.toString();
//console.log("assing",isAssigne);


  if (!isAssigne) {
    return res.send(new apiError(400, "Only task assignee can update tasks"));
  }
  


  try {
    const taskDetails = await Task.findByIdAndUpdate(
      taskID, 
      { taskStatus },
      { new: true }  // Return the updated task
    );

    return res.send(
      new apiResponse(200, "Task updated successfully", taskDetails)
    );
  } catch (error) {
    return res.send(new apiError(400, "Error updating task", error));
  }
});

const getAllTasks = asyncHandler(async (req, res) => {
  const { teamId } = req.query;
  //console.log(req.headers);
  
  const currentUser = req.user;

  const team = await Team.findOne({ teamId });

  const isAdmin = currentUser._id == team.teamAdmins._id;

  const tasks = await Task.find({ teamId });
  
  return res.send(
    new apiResponse(200, "Tasks retrieved successfully", { tasks, isAdmin,team })
  );
});

const getUserTasks = asyncHandler(async (req, res) => {
  
  try {
    const currentUser = req.user;
    const tasks = await Task.find({ assignTo:currentUser });

    //console.log(currentUser);
    //console.log(tasks);
    
    const pipeline = await Task.aggregate([
      // Match the specific team by teamId
      {
          $match: {
              assignTo: currentUser,
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
  
   return res.send(
    new apiResponse(200, "Tasks retrieved successfully", { tasks,pipeline })
  );


  } catch (error) {

    res.send(apiError(404,"Error getting currentuser",error))
  }

 
  
  
});








export { createTask, deleteTask, updateTask, getAllTasks,getUserTasks};
