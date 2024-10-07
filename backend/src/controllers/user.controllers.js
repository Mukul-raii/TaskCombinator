import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";

import path from "path";
import { Team } from "../models/team.models.js";
import { Octokit } from "octokit";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";

import { dirname, join } from "path";
import fs from "fs/promises";


const signup = asyncHandler(async (req, res) => {
    const { path, userName, email, password } = req.body;

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
    //console.log(user);

    if (!user) {
        return res.send(new apiError(404, "User not found"));
    }

    const isPasswordCorrect = await user.IsPasswordCorrect(password);
    //console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
        return res.send(new apiError(400, "Incorrect password"));
    }

    const option = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };

    const token = await user.generateToken();

    return res
        .setHeader("Authorization", `Bearer ${token}`)
        .cookie("token", token, option)
        .send(new apiResponse(200, "User logged in successfully", { user, token }));
});

const logout = async (req, res) => {
    // Set token to none and expire after 2 seconds

    return res
        .cookie("token", "none", {
            expires: new Date(Date.now() + 1 * 1000),
            httpOnly: true,
        })
        .send(new apiResponse(200, "User logged out successfully"));
};

const loggedInUser = asyncHandler(async (req, res) => {
    try {
        const currentUser = req.user;
        const user = currentUser._id;

        const me = await User.find({ _id: user });
        const myteams = await Team.find({ teamMembers: user });
        if (!me) {
            return res.send(new apiError(404, "User not found"));
        }

        res.status(200).json(new apiResponse(200, "User found", { me, myteams }));
    } catch (error) {
        res.send(apiError(404, "User not found", error));
    }
});

const adduserName = asyncHandler(async (req, res) => {
    const { userName } = req.body;
    //console.log(userName);

    const currentUser = req.user;

    const me = await User.find({ _id: currentUser._id });
    //console.log(me);
    if (!me) {
        return res.send(new apiError(404, "User not found"));
    }

    try {
        const ress = await User.findByIdAndUpdate(
            currentUser._id,
            { userName: userName },
            { new: true }
        );
        res.send(new apiResponse(200, "User name updated successfully", ress));
    } catch (error) {
        res.send(new apiError(404, "User not found", error));
    }
});

/* 
const GoogleLogin = async (req, res) => {
    const { idToken } = req.body;
    try {
        //console.log('idToken',idToken);
        
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        //console.log(ticket);
        
        const payload = ticket.getPayload();
        const { email, name } = payload;
//console.log("payload",payload);

        let user = await User.findOne({ email });
     
        if (!user) {
            user = new User({
                email,
                userName: name || " ",
            });
            await user.save();
        }
    } catch (error) {
        return res.send(new apiError(404, "user not founf "));
    }

    const option = {
        httpOnly: true,
        secure: true,
        path: "/",
    };

    const token = await user.generateToken();

    return res
        .status(200)
        .set("Authorization", `Bearer ${token}`)
        .cookie("token", token, option)
        .send(new apiResponse(200, "User logged in successfully", { user, token }));
};
 */

const GoogleLogin = async (req, res) => {
    const { idToken, email, uid, name } = req.body;

    let user = await User.findOne({ email });
    try {
        if (!idToken) {
            return res.send(new apiError(404, "user not found "));
        }

        if (!user) {
            user = new User({
                email,
            });

            await user.save();
            //console.log(user);
        }
    } catch (error) {
        return res.send(new apiError(404, "user not found "));
    }

    const option = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };

    const token = await user.generateToken();
    //console.log("gen token ",token);

    return res
        .setHeader("Authorization", `Bearer ${token}`)
        .cookie("token", token, option)
        .send(new apiResponse(200, "User logged in successfully", { user, token }));
};

const Github_Issue = async (req, res) => {
    const { owner, repo, issue_number } = req.body;

    const octokit = new Octokit({
        auth: process.env.TOKEN,
    });

    try {
        /*     const result =await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}",{
        owner: owner,           
        repo: repo,            
        issue_number: issue_number 
    
    }) */

        const result = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`,
            {
                headers: {
                    Authorization: `token ${process.env.TOKEN}`,
                },
            }
        );
        //console.log(result.data.assignees);
        res.status(200).send(result.data);
    } catch (error) {
        console.error("Error retrieving the issue:", error);
        res.status(error.status || 500).send({
            message: "Error retrieving the issue",
            error: error.response ? error.response.data.message : error.message,
        });
    }
};

const photoUpload = async (req, res) => {
    console.log("file", req.data);
    const data = req.data;

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_APIKEY,
        api_secret: process.env.CLOUDINARY_SECRET,
    });

    const currentUser = req.user;

    const filePath = `./uploads/${data.filename}`;


    console.log(filePath);

    try {
        await fs.access(filePath);
    } catch (error) {
        return res.status(400).json({ error: "Uploaded file not found" });
    }

    
    try {
        console.log("wokring");
        
        uploadedFile = await cloudinary.uploader.upload("filePath", {
            resource_type: "auto",
        
      
        });
        console.log("Cloudinary upload result:", uploadedFile);

        await fs.unlinkSync(filePath);
console.log("file deleted");

        res.status(200).json({
            message: "File uploaded successfully to Cloudinary",
            result: uploadedFile,
        });
    } catch (error) {
        res.status(400).json({ message:"error uploading file" ,error:error});
    }
};
export { signup, login, logout, loggedInUser, GoogleLogin, adduserName, Github_Issue, photoUpload };






/* 
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";

const photoUpload = async (req, res) => {
    let uploadedFile = null;
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDINARY_APIKEY,
            api_secret: process.env.CLOUDINARY_SECRET,
        });

        const filePath = path.join(process.cwd(), "uploads", req.file.filename);

        // Check if file exists
        try {
            await fs.access(filePath);
        } catch (error) {
            return res.status(400).json({ error: "Uploaded file not found" });
        }

        // Increase timeout for large files (adjust as needed)
        const uploadOptions = {
            timeout: 60000, // 60 seconds
        };

        uploadedFile = await cloudinary.uploader.upload(filePath, uploadOptions);
        console.log("Cloudinary upload result:", uploadedFile);

        // Delete the local file after successful upload
        await fs.unlink(filePath);

        res.status(200).json({
            message: "File uploaded successfully to Cloudinary",
            result: uploadedFile,
        });
    } catch (error) {
        console.error("Error in photoUpload:", error);

        // If file upload to Cloudinary failed, but local file exists, delete it
        if (!uploadedFile && req.file) {
            const filePath = path.join(process.cwd(), "uploads", req.file.filename);
            try {
                await fs.unlink(filePath);
            } catch (unlinkError) {
                console.error("Error deleting local file:", unlinkError);
            }
        }

        // Check if headers have not been sent yet
        if (!res.headersSent) {
            res.status(500).json({ error: "An error occurred while processing the upload" });
        }
    }
};

export default photoUpload;
 */