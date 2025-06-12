import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


import serverConfigVariable from "../config/serverConfigVariable.js";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,  
        trim: true,      
        lowercase: true  
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,  
        trim: true,
        lowercase: true,
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 'Email is invalid'],  
        index: true  
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6 , "Password have atleast 6 character"],
        match : [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ , "Password must have small and big capital letter with numeric digit."] 
    },
    teamId: {
        type: String,
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }]
}, {
    timestamps: true  
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){return next()}
    this.password=await bcrypt.hash(this.password, 10)
     next()
    })

userSchema.methods.IsPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}



userSchema.methods.generateToken = async function () {
    const payload = {};
    
 
    if (this._id) {
        payload._id = this._id;
    }
    if (this.userName) {
        payload.userName = this.userName;
    }
    if (this.email) {
        payload.email = this.email;
    }


    return jwt.sign(payload, serverConfigVariable.JWT_SECRET, {
            expiresIn: serverConfigVariable.JWT_TOKEN_EXPIRES
        }
    )
}

 const User = mongoose.model('User', userSchema)
 export {User}