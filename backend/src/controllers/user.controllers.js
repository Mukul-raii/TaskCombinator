import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";

const signup = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
console.log("vale",userName, email, password);

  const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
  console.log(existingUser);
  
  if (existingUser) {
    return res.send(new apiError(400, "User already exists"));
  }


  try {
    const userDetails = await User.create({
      userName,
      email,
      password,
    });

    return res.send(new apiResponse(201, "User created successfully", userDetails));
  } catch (error) {
    return res.send(new apiError(400, "Error creating user"));
  }
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send(new apiError(400, "Please provide email and password"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.send(new apiError(404, "User not found"));
  }

  const isPasswordCorrect = await user.IsPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return res.send(new apiError(400, "Incorrect password"));
  }
  
  const option = {
    httpOnly: true,
    secure: true
  };

  const token = await user.generateToken();
console.log( token);

  return res.set("Authorization", `Bearer ${token}`)
    .cookie("token", token, option)
    .send(new apiResponse(200, "User logged in successfully", token));
});

export { signup, login };