import { Router } from "express";

const router = Router();    

import { userController } from "../../controller/index.js"


router
  .route("/register")
  .post(
    userController.registerController
  )

router
  .route("/verify-email/:username")
  .post(
    userController.verifyEmailController
  )

router
  .route("/login")
  .post(
    userController.loginController
  )




export default router