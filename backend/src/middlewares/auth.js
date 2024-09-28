import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

const authHandler = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    const token = (authorization && authorization.split(' ')[1]) || req.cookies.token;

    if (!token) {
      return next(Error);
    }
console.log(token);

    try {
        const decodedToken= jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decodedToken;
      
      
         next();
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send(new apiError(401, "Token has expired"));
        }
        return res.status(400).send(new apiError(400, "Error verifying token", error.message));
       }

}


export default authHandler