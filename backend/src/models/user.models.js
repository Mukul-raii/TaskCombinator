import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema= new mongoose.Schema({
    userName: {type: String, toLowerCase: true},
    email: {type: String, required: true, unique: true,toLowerCase: true},
    password: {type: String},
    teamId:{type: String},
    teams:[{type: mongoose.Schema.Types.ObjectId, ref: "Team"}]
   

   
})

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


    return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        }
    )
}

 const User = mongoose.model('User', userSchema)
 export {User}