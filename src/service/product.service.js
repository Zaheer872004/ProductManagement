import { serviceAsyncHandler, ApiError } from "../helper/index.js";
import { productRepository } from "../repository/index.js";
import { productSchema } from "../zodSchema/product.schema.js";
import { username as usernameSchema } from "../zodSchema/user.schema.js";



class ProductService {
  constructor() {
    // this.productRepository = productRepository
  } 


  createSingleProduct = serviceAsyncHandler(async (productName, total_quantity, price, category, expiryDate, user_id, supplyBatch) => {

    const result = productSchema.safeParse({productName,total_quantity,price,category,expiryDate})

    if(!result.success){
      throw new ApiError(400, "product zodSchema failed to parse")
    }
    

    const product = await productRepository.createSingleProduct(productName, total_quantity, price, category, expiryDate, user_id, supplyBatch)

    if(!product) throw new ApiError(400, "Product not created")

    return product;

  })


  updateSingleProduct = serviceAsyncHandler( async (prod_id , {productName, total_quantity, price, category, expiryDate, user_id}) => {


    if(!prod_id){
      throw new ApiError(400, "Product id is required")
    }


    const result = productSchema.safeParse({productName,total_quantity,price,category,expiryDate})

    if(!result.success){
      throw new ApiError(400, "product zodSchema failed to parse")
    }

    // check the validation
    // from the user table join the productUser with userId
    // from the productUser table check pass from params prod_id is equal to productUser.productId

    const getUserProductDetails = await productRepository.getUserProductDetails(user_id,prod_id);

    if(!getUserProductDetails){
      throw new ApiError(400, "Product not found")
    }

    if(getUserProductDetails.productUser.userId !== user_id || getUserProductDetails.productUser.productId !== prod_id){
      throw new ApiError(400, "User not authorized to update this product")
    }

    const response = await productRepository.updateSingleProduct(prod_id, {productName, total_quantity, price, category, expiryDate,user_id})


    if(!response){
      throw new ApiError(400, "Product not updated")
    }

    return response;



  })

  getSingleProduct = serviceAsyncHandler(async (prod_id) => {

    const response = await productRepository.getSingleProduct(prod_id)

    if(!response){
      throw new ApiError(400, "Product not found")
    }

    return response;



  })


  getSingleProductDetailsByUsername = serviceAsyncHandler(async (prod_id,username) => {

    const result = usernameSchema.safeParse({username});

    if(!result.success){
      throw new ApiError(400, "product zodSchema failed to parse the usrername | please provide valid username")
    }

    const AllDetailsOfProduct = await productRepository.getSingleProductDetailsByUsername(prod_id,username)

    if(!AllDetailsOfProduct){
      throw new ApiError(400, "Product not found")
    }

    return AllDetailsOfProduct;

  })


  AllProductDetailsByUsername = serviceAsyncHandler(async (username) => {

    const result = usernameSchema.safeParse({username});  

    if(!result.success){
      throw new ApiError(400, "product zodSchema failed to parse the usrername | please provide valid username")
    }

    const AllDetailsOfProduct = await productRepository.AllProductDetailsByUsername(username)

    if(!AllDetailsOfProduct){
      throw new ApiError(400, "Product not found")
    }

    return AllDetailsOfProduct;

  })

}




export const productService = new ProductService();