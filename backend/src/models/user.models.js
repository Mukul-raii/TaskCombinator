import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema= new mongoose.Schema({
    userName: {type: String, required: true,toLowerCase: true},
    email: {type: String, required: true, unique: true,toLowerCase: true},
    password: {type: String, required: true},
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
    return  jwt.sign(
        {
            _id: this._id,
            userName: this.userName,
            email: this.email
        },process.env.JWT_SECRET,{
            expiresIn: '1d'
        }
    )
}

 const User = mongoose.model('User', userSchema)
 export {User}