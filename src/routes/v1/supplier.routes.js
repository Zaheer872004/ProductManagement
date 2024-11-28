import { Router } from "express";

const router = Router();    

import { supplierController } from "../../controller/index.js"
import { verifyJWT } from "../../middleware/getUser.middleware.js"



router
  .route("/create-supplier")
  .post(
    verifyJWT,
    supplierController.createSupplier
  )

router
  .route("/update-supplier/:supp_id")
  .patch(
    verifyJWT,
    supplierController.updateSupplier
  )

router
  .route("/delete-supplier/:supp_id")
  .delete(
    verifyJWT,
    supplierController.deleteSupplier
  )

router
  .route("/get-supplier/:supp_id")
  .get(
    verifyJWT,
    supplierController.getSupplierDetails
  )

export default router