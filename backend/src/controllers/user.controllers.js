import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import { decode } from "jsonwebtoken";

const signup = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
  
  
  if (existingUser) {
    return res.send(new apiError(400, "User already exists"));
  }


  try {
    const userDetails = await User.create({
      userName,
      email,
      password,
    });
    console.log(userDetails);
    
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
    secure: true,
    path: "/",

  };


 
  const token = await user.generateToken();
console.log( token);

  return res.set("Authorization", `Bearer ${token}`)
    .cookie('token', token, option)
    .send(new apiResponse(200, "User logged in successfully", user));
});


const logout = async (req, res) => {
  // Set token to none and expire after 2 seconds
  console.log("logout requestes");
  
 return res.cookie('token', 'none', {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true,
  }).send(new apiResponse(200, "User logged out successfully"));
}



const loggedInUser=asyncHandler(async(req,res)=>{
  const currentUser=  req.user


  
  return res.send(new apiResponse(200, "User found", currentUser));

})

export { signup, login,logout,loggedInUser };