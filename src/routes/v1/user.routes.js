import { Router } from "express";

const router = Router();    

import { userController } from "../../controller/index.js"


router.route("/register").post(userController.registerController)



export default router