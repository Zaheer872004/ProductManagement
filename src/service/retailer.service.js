import { address as addressSchema } from "../zodSchema/retailer.schema.js";
import { serviceAsyncHandler } from "../helper/asyncHandler.js";


import { retailerRepository } from "../repository/retailer.repository.js";


class RetailerService {

  createRetailer = serviceAsyncHandler(async (user_id, address) => {
    

    const respone = addressSchema.safeParse(address);

    if(!respone.success){
      throw new ApiError(400, respone.error.message)
    }

    const createRetailer = await retailerRepository.createRetailer(user_id, address);

    if(!createRetailer){
      throw new ApiError(400, "Unable to create retailer")
    }


    return createRetailer;



  })

    // model Retailer {
  //   retail_id     Int              @id @default(autoincrement())
  //   userId        Int @unique
  //   address       String?
  //   // name          String
  //   // email         String
  //   // username and email getting from the user table using join query
  
  //   user        User      @relation(fields: [userId], references: [user_id]) // Relation to User
  
  //   products      ProductRetailer[] // Relationship with ProductRetailer
  //   sales         Sale[]            // One-to-many relationship with sales
  // }

  updateRetailer = serviceAsyncHandler(async (retailer_id, user_id, address) => {
    if(!retailer_id){
      throw new ApiError(400, "Retailer id is required")  
    }

    const respone = addressSchema.safeParse(address);

    if(!respone.success){
      throw new ApiError(400, respone.error.message)
    }

    const getRetailer = await retailerRepository.findRetailerById(retailer_id);

    if(!getRetailer){
      throw new ApiError(404, "Retailer not found")
    }

    if(getRetailer.userId.toString() !== user_id.toString()){
      throw new ApiError(401, "Unauthorized | You are not allowed to update this retailer")
    }

    const updateRetailer = await retailerRepository.updateRetailer(retailer_id, address);

    if(!updateRetailer){
      throw new ApiError(400, "Unable to update retailer")
    }


    return updateRetailer;


  });

  deleteRetailer = serviceAsyncHandler(async (retailer_id, user_id) => {

    if(!retailer_id){
      throw new ApiError(400, "Retailer id is required")  
    }

    const getRetailer = await retailerRepository.findRetailerById(retailer_id);

    if(!getRetailer){
      throw new ApiError(404, "Retailer not found")
    }

    if(getRetailer.userId.toString() !== user_id.toString()){
      throw new ApiError(401, "Unauthorized | You are not allowed to delete this retailer")
    }

    const deleteRetailer = await retailerRepository.deleteRetailer(retailer_id);

    if(!deleteRetailer){
      throw new ApiError(400, "Unable to delete retailer")
    }


    return deleteRetailer;




  })

  getRetailer = serviceAsyncHandler(async (retailer_id) => {

    if(!retailer_id){
      throw new ApiError(400, "Retailer id is required")  
    }

    const getRetailerDetails = await retailerRepository.findRetailerDetails(retailer_id);

    if(!getRetailerDetails){
      throw new ApiError(404, "Retailer not found")
    }

    return getRetailerDetails;


  })


  getAllRetailer = serviceAsyncHandler(async () => {

    const getAllRetailer = await retailerRepository.findAllRetailer();

    if(!getAllRetailer){
      throw new ApiError(404, "Retailer not found")
    }

    return getAllRetailer;

  })


}


export const retailerService = new RetailerService();