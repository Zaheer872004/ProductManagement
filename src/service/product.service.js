import { serviceAsyncHandler, ApiError } from "../helper/index.js";
import { productRepository } from "../repository/index.js";
import { productSchema } from "../zodSchema/product.schema.js";



class ProductService {
  constructor() {
    // this.productRepository = productRepository
  } 


  createProduct = serviceAsyncHandler(async (prodcutName, total_quantity, price, category, expiryDate, user_id, supplyBatch) => {

    const result = productSchema.safeParse({prodcutName,total_quantity,price,category,expiryDate})

    if(!result.success){
      throw new ApiError(400, "product zodSchema failed to parse")
    }
    

    const product = await productRepository.createSingleProuct(prodcutName, total_quantity, price, category, expiryDate, user_id, supplyBatch)

    if(!product) throw new ApiError(400, "Product not created")

    return product;

  })


}


export const productService = new ProductService();