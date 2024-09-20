import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { Team } from "../models/team.models.js";
import { User } from "../models/user.models.js";

const createTeam = asyncHandler(async (req, res, next) => {
  const { teamName, teamMembers } = req.body;
  const currentUser = req.user;

  

  
  if (!teamName ) {
    return res.send(new apiError(400, "Please provide team name"));
  }

  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
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

    return res.send(
      new apiResponse(201, "Team created successfully", teamDetails)
    );
  } catch (error) {
    return res.send(new apiError(400, "Error creating team"));
  }
});

const deleteTeam = asyncHandler(async (req, res) => {
  const { teamId } = req.body;

  const team = await Team.findOne({ teamId });


  if (team.teamAdmins != req.user._id) {
   
    return res.send(
      new apiError(400, "You are not authorized to delete this team")
    );
  }

  const deleteTeam = await Team.findOneAndDelete({ teamId });

  return res.send(
    new apiResponse(200, "Team deleted successfully", deleteTeam)
  );
});



const joinTeam = asyncHandler(async (req, res) => {
  const { teamId } = req.body;
  const team = await Team.findOne({ teamId });
  team.teamMembers.push(req.user._id);
  await team.save();
  const user = await User.findById(req.user._id);
  user.teams.push(team._id);

  await user.save();
  return res.send(new apiResponse(200, "Team joined successfully", team));
});

export { createTeam, deleteTeam, joinTeam };
