import mongoose from "mongoose"

const taskSchema= new mongoose.Schema({

    taskName: {type: String, required: true, unique: true,toLowerCase: true},
    taskDescription: {type: String, required: true},
    taskStatus: {type: String, required: true},
    taskDueDate: {type: Date, required: true},
    taskPriority: {type: String, required: true},
    assignTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    teamId:{
       type:String,
       required:true
    }


},{timestamps:true})

export const Task= mongoose.model('Task', taskSchema)