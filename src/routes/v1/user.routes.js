import { Router } from "express";

const router = Router();    

import { userController } from "../../controller/index.js"
import { verifyJWT } from "../../middleware/getUser.middleware.js"


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


// get authentication mean user must be logged in


router
  .route("/logout")
  .get(
    verifyJWT,
    userController.logoutController
  )

router
  .route("/get-user")
  .get(
    verifyJWT,
    userController.getUserDetails
  )

router
  .route("/update-profile")
  .patch(
    verifyJWT,
    userController.updateProfile
  )

router
  .route("/update-password")
  .patch(
    verifyJWT,
    userController.updatePassword
  )




export default router