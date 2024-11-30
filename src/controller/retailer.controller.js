import { ApiResponse, asyncHandler } from "../helper/index.js";
import { retailerService } from "../service/retailer.service";

class RetailerController {


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

  createRetailer = asyncHandler(async (req, res) => {

    const {user_id } = req.user;

    const {address} = req.body;

    const response = await retailerService.createRetailer(user_id, {address});

    if(!response){
      throw new ApiError(400, "Unable to create retailer")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                response,
                "Retailer created successfully"
            )
        )


  })

  // use patch method
  updateRetailer = asyncHandler(async (req, res) => {
    
    const {user_id } = req.user;

    const {address} = req.body;
    const {retailer_id} = req.params;

    const response = await retailerService.updateRetailer(retailer_id, user_id, address);

    if(!response){
      throw new ApiError(400, "Unable to create retailer")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                response,
                "Retailer updated successfully"
            )
        )

  })

  deleteRetailer = asyncHandler(async (req, res) => {

    const {user_id} = req.user;
    const { retailer_id } = req.params;

    const response = await retailerService.deleteRetailer(retailer_id, user_id);

    if(!response){
      throw new ApiError(400, "Unable to delete retailer")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                response,
                "Retailer deleted successfully"
            )
        )


  })

  getRetailer = asyncHandler(async (req, res) => {

    const {user_id} = req.user;
    const { retailer_id } = req.params;

    const response = await retailerService.getRetailer(retailer_id, user_id);

    if(!response){
      throw new ApiError(400, "Unable to get retailer")
    } 

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                response,
                "Retailer fetched successfully"
            )
        )

  })

  

}


export const retailerController = new RetailerController();

