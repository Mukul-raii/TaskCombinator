import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";

import { Team } from "../models/team.models.js";


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

    return res
        .set("Authorization", `Bearer ${token}`)
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
    const currentUser = req.user;
    const user = currentUser._id;

    const me = await User.find({ _id: user });
    const myteams = await Team.find({ teamMembers: user });
    if (!me) {
        return res.send(new apiError(404, "User not found"));
    }

    res.status(200).json(new apiResponse(200, "User found", { me, myteams }));
});
/* 
const GoogleLogin = async (req, res) => {
    const { idToken } = req.body;
    try {
        console.log('idToken',idToken);
        
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        console.log(ticket);
        
        const payload = ticket.getPayload();
        const { email, name } = payload;
console.log("payload",payload);

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
            console.log(user);
        }
    } catch (error) {
        return res.send(new apiError(404, "user not found "));
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

export { signup, login, logout, loggedInUser, GoogleLogin };
