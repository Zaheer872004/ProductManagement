import { Router } from "express";

const router = Router();    

import { productController } from "../../controller/index.js"
import { verifyJWT } from "../../middleware/getUser.middleware.js"

router
  .route("/create")
  .post( verifyJWT,productController.createProduct)

export default router