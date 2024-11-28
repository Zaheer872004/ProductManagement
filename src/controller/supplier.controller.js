import { supplierService } from "../service/index.js";
import { asyncHandler,ApiError,ApiResponse } from "../helper/index.js";





class SupplierController { 

  constructor(){}


  createSupplier = asyncHandler(async (req, res) => {

    const {user_id} = req.user; // here userId also known as supplierId


    console.log(user_id)

    // addharNo      String  @unique
    // description   String?
    // address       String?

    const { addharNo, description, address } = req.body

    const respone = await supplierService.createSupplier(user_id, {addharNo,description,address} );

    if(!respone){
      throw new ApiError(400, "Unable to create supplier")
    }

    return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            respone,
            "Supplier created successfully"
          )
        )


  })

  // use here patch method
  updateSupplier = asyncHandler(async (req, res) => {

    const {user_id} = req.user; 

    const { addharNo, description, address } = req.body
    const { supp_id } = req.params;


    const respone = await supplierService.updateSupplier(user_id, {supp_id, addharNo,description,address} );

    if(!respone){
      throw new ApiError(400, "Unable to update supplier")
    } 


    return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            respone,
            "Supplier updated successfully"
          )
        )


  })


  deleteSupplier = asyncHandler(async (req, res) => {


    const { user_id } = req.user; 
    const { supp_id } = req.params;

    const respone = await supplierService.deleteSupplier(user_id, supp_id);

    if(!respone){
      throw new ApiError(400, "Unable to delete supplier")
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          respone,
          "Supplier deleted successfully"
        )
      )




  })


      // // Define the Supplier model
// model Supplier {
//   supp_id       Int              @id @default(autoincrement())
//   userId        Int @unique // forign key to user table
//   // phone_no      String?
//   // email         String?
//   // feedback      String?
//   addharNo      String  @unique
//   description   String?
//   address       String?
//   // other details getting from the user table...

//   user        User      @relation(fields: [userId], references: [user_id]) // Relation to User

//   products      ProductSupplier[] // Relationship with ProductSupplier
// }

  getSupplierDetails = asyncHandler(async (req, res) => {


    const { user_id } = req.user; 
    const { supp_id } = req.params;

    if(!supp_id){
      throw new ApiError(400, "Supplier id is required")
    }

    const respone = await supplierService.getSupplierDetails(user_id, supp_id);

    if(!respone){
      throw new ApiError(400, "Unable to get supplier details")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          respone,
          "Supplier details fetched successfully"
        )
      )


  })

  // other methods also here is  getProductsBySupplier

  


}


export const supplierController = new SupplierController();