import { ApiError, ApiResponse, asyncHandler } from "../helper/index.js"
import { productService } from "../service/index.js"

class ProductController {
  constructor() {
    // this.productService = productService
  }


  createSingleProduct = asyncHandler(async (req, res) => {
    // check in middleware all the required field should come.

    const { productName, total_quantity, price, category, expiryDate } = req.body;

    const {user_id} = req.user; // here userId also known as supplierId
    // here user_id means identity of supplier
    console.log(user_id)

    // supplyBatchDate is date.now()
    const supplyBatch = Date.now().toString();

    console.log(productName,total_quantity,price,category,expiryDate,user_id);

    const response = await productService.createSingleProduct(
      productName,
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


  // update the product
  // use the patch request method here
  updateSingleProduct = asyncHandler(async (req, res) => {

    const { prod_id } = req.params;
    const { user_id } = req.user;

    const { productName, total_quantity, price, category, expiryDate } = req.body;

    const response = await productService.updateSingleProduct(prod_id, { productName, total_quantity, price, category, expiryDate, user_id });

    if (!response) {
      throw new ApiError(400, "Product not updated");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          response,
          "Product updated successfully"
        )
      )


  })

  // I'm not allowing to delete the product

  // get The product by product id

  getSingleProduct = asyncHandler(async (req, res) => {

    const { prod_id } = req.params;

    if(!prod_id){
      throw new ApiError(400, "Product id is required")
    }

    const response = await productService.getSingleProduct(prod_id);

    if(!response){
      throw new ApiError(400, "Product not found")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          response,
          "Product found successfully"
        )
      )


  })

  getSingleProductDetailsByUsername = asyncHandler(async (req, res) => {

    const { prod_id, username } = req.params;

    if(!prod_id || !username){
      throw new ApiError(400, "Product id and username is required")
    }

    const response = await productService.getSingleProductDetailsByUsername(prod_id, username);

    if(!response){
      throw new ApiError(400, "Product not found")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          response,
          "Product found successfully"
        )
      )
  })


  AllProductDetailsByUsername = asyncHandler(async (req, res) => {

    const { username } = req.params;

    if(!username){
      throw new ApiError(400, "username is required")
    }

    const response = await productService.AllProductDetailsByUsername(username);  

    if(!response){
      throw new ApiError(400, "Product not found")  
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          response,
          "Product found successfully"
        )
      )
  })  


}

export const productController = new ProductController();



