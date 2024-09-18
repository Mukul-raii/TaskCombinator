import  Router  from "express";
import {signup,login,logout,loggedInUser} from '../controllers/user.controllers.js'
import authHandler from "../middlewares/auth.js";
const router = Router();

router.route("/signup").post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/getme').get(authHandler, loggedInUser)


export default router;