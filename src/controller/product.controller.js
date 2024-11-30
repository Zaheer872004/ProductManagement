import { ApiResponse, asyncHandler } from "../helper/index.js"
import { productService } from "../service/index.js"

class ProductController {
  constructor() {
    // this.productService = productService
  }


  createProduct = asyncHandler(async (req, res) => {
    // check in middleware all the required field should come.

    const { prodcutName, total_quantity, price, category, expiryDate } = req.body;
    const {user_id} = req.user; // here userId also known as supplierId

    console.log(user_id)

    // supplyBatchDate is date.now()
    const supplyBatch = Date.now().toString();

    console.log(prodcutName,total_quantity,price,category,expiryDate,user_id);

    const response = await productService.createProduct(
      prodcutName,
      total_quantity,
      price,
      category,
      expiryDate,
      user_id,
      supplyBatch
    )

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          response,
          "Product created successfully"
        )
      )

  })





}

export const productController = new ProductController();



