import  Router  from "express";
import {signup,login,logout,loggedInUser,GoogleLogin,adduserName} from '../controllers/user.controllers.js'
import authHandler from "../middlewares/auth.js";
const router = Router();

router.route("/signup").post(signup)
router.route('/login').post(login)
router.route('/googleLogin').post(GoogleLogin)
router.route('/logout').post(logout)
router.route('/getme').get(authHandler, loggedInUser)
router.route('/updateUser').put(authHandler,adduserName)


export default router;