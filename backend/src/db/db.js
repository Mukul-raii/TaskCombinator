
// app.js
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: "../.env" })

const ConnectDb= async function() {
     const connetionINSTANCE=  await mongoose.connect(process.env.MONGO_URI)

    console.log("MongoDB Connected",connetionINSTANCE.connection.host)

}
export default ConnectDb