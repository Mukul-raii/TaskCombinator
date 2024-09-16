import mongoose from "mongoose";


const teamSchema= new mongoose.Schema({

    teamName: {type: String, required: true, unique: true,toLowerCase: true},
    teamId: {type: String, required: true, unique: true,toLowerCase: true},
    teamMembers: {type: Array},
    teamAdmins: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }



},{timestamps:true})

export const Team= mongoose.model('Team', teamSchema)