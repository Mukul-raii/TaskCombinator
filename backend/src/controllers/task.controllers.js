import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { Team } from "../models/team.models.js";
import { Task } from "../models/task.models.js";
import { User } from "../models/user.models.js";

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

  const isAdmin=currentUser._id == team.teamAdmins._id
  
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
    console.log(taskDetails);
    return res.send(
      new apiResponse(201, "Task created successfully", taskDetails)
    );
  } catch (error) {
    return res.send(new apiError(400, "Error creating task", error));
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.body;
  const currentUser = req.user;

  const task = await Task.findOne({ _id: taskId });
  const team = await Team.findOne({ teamId: task.teamId });
  if (currentUser._id != team.teamAdmins._id) {
    return res.send(new apiError(400, "Only team admins can delete tasks"));
  }

  await Task.findByIdAndDelete({ _id: taskId });
  return res.send(new apiResponse(200, "Task deleted successfully", task));
});

const updateTask = asyncHandler(async (req, res) => {
  const {
    taskName,
    taskDescription,
    taskStatus,
    taskId,
    taskDueDate,
    taskPriority,
    teamId,
    assignTo,
  } = req.body;

  const currentUser = req.user;

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
  const task = await Task.findOne({ _id: taskId });
  const team = await Team.findOne({ teamId: task.teamId });

  try {
    const taskDetails = await Task.findByIdAndUpdate(
      { _id: taskId },
      {
        taskName,
        taskDescription,
        taskStatus,
        taskDueDate,
        taskPriority,
        teamId,
        assignTo,
      }
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
  const currentUser = req.user;

  const team = await Team.findOne({ teamId });

  const isAdmin=currentUser._id == team.teamAdmins._id
  if (!isAdmin) {
    return res.send(new apiError(400, "Only team admins can get all tasks"));
  }
  const tasks = await Task.find({ teamId });
1
  return res.send(new apiResponse(200, "Tasks retrieved successfully", {tasks,isAdmin}));
});
export { createTask, deleteTask, updateTask, getAllTasks };
