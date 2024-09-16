import { Router } from "express";
import authHandler from "../middlewares/auth.js";
import { createTask,deleteTask ,getAllTasks,updateTask} from "../controllers/task.controllers.js";    
const router = Router();

router.route('/create').post(authHandler,createTask)
router.route('/delete').delete(authHandler,deleteTask)
router.route('/update').put(authHandler,updateTask)
router.route('/all').get(authHandler,getAllTasks)



export default router