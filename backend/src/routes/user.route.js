import  Router  from "express";
import {signup,login,logout,loggedInUser,GoogleLogin,adduserName,Github_Issue, photoUpload} from '../controllers/user.controllers.js'
import authHandler from "../middlewares/auth.js";

import filFileUpload from "../middlewares/multer.js";
const router = Router();

router.route("/signup").post(signup)
router.route('/login').post(login)
router.route('/googleLogin').post(GoogleLogin)
router.route('/logout').post(logout)
router.route('/getme').get(authHandler, loggedInUser)
router.route('/updateUser').put(authHandler,adduserName)
router.route('/github_issue').post(authHandler,Github_Issue)
router.route('/avatarUpload').post(authHandler,filFileUpload,photoUpload)


export default router;