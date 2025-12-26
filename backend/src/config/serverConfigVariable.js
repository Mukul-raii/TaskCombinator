import dotenv from 'dotenv'
dotenv.config();


const serverConfigVariable = {
    PORT : process.env.PORT,
    SALT_WORK_FECTOR : process.env.SALT_WORK_FECTOR,
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_TOKEN_EXPIRES : process.env.JWT_TOKEN_EXPIRES
}

export default serverConfigVariable;