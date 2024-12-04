import { Router } from "express";

const router = Router();    

import { productController } from "../../controller/index.js"
import { verifyJWT } from "../../middleware/getUser.middleware.js"

router
  .route("/create-single-product")
  .post( verifyJWT,productController.createSingleProduct)


router
  .route("/update-product/:prod_id")
  .patch( 
    verifyJWT,
    productController.updateSingleProduct
  )


router
  .route("/get-single-product/:prod_id")
  .get(
    verifyJWT,
    productController.getSingleProduct
  )

router
  .route("/get-single-productDetails/:prod_id/:username")
  .get(
    verifyJWT,
    productController.getSingleProductDetailsByUsername
  )

router
  .route("/all-product-details/:username")
  .get(
    verifyJWT,
    productController.AllProductDetailsByUsername
  )




export default router


