import { Router } from "express";

const router = Router();    

import { retailerController } from "../../controller/index.js"
import { verifyJWT } from "../../middleware/getUser.middleware.js"



router
  .route("/create-retailer")
  .post(
    verifyJWT,
    retailerController.createRetailer
  )

router
  .route("/update-retailer/:retailer_id")
  .patch(
    verifyJWT,
    retailerController.updateRetailer
  )

router
  .route("/delete-retailer/:retailer_id")
  .delete(
    verifyJWT,
    retailerController.deleteRetailer
  )

router
  .route("/get-retailer/:retailer_id")
  .get(
    verifyJWT,
    retailerController.getRetailer
  )

router
  .route("/get-all-retailers")
  .get(
    verifyJWT,
    retailerController.getAllRetailers
  )

export default router