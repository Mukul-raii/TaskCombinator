import mongoose from 'mongoose'

import serverConfigVariable from '../config/serverConfigVariable.js'


const ConnectDb = async function () {
    const MONGO_URI = serverConfigVariable.MONGO_URI;

    if (!MONGO_URI) {
        console.log(`MongoDB url not present in server confrigation guard.`)
        process.exit(1);
    }

    try {
        const connetionINSTANCE = await mongoose.connect(MONGO_URI)
        console.log(`Successfully connected mongodb uri ${MONGO_URI} and host ${connetionINSTANCE.connection.host}`)

        mongoose.connection.on('disconnected', () => {
            console.log(`MongoDB is disconnected!!`)
        })

        mongoose.connection.on('error', (error) => {
            console.log(`MongoDB connection error`, error)
        })
    } catch (error) {
        console.error('Error while connecting to MongoDB:', error);
        process.exit(1);
    }


}
export default ConnectDb