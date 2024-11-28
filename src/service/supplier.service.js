import { serviceAsyncHandler, ApiError } from "../helper/index.js";
import { createSupplierSchema } from "../zodSchema/supplier.schema.js";
import { supplierRepository } from "../repository/supplier.repository.js";
import { userRespository } from "../repository/user.repository.js";


class SupplierService {

  constructor(){}





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

  createSupplier = serviceAsyncHandler(async (user_id, {addharNo,description,address}) => {


    const respone = createSupplierSchema.safeParse({addharNo,description,address});

    if(!respone.success){
      throw new ApiError(400, respone.error.message)
    }

    const getUserData = await userRespository.findUserById(user_id);
    
    if(!getUserData){
      throw new ApiError(404, "User not found")
    }

    // const {} = getUserData;  // we can get the all the data from the user table

    const createSupplier = await supplierRepository.createSupplier(user_id, {addharNo,description,address});

    if(!createSupplier){
      throw new ApiError(400, "Unable to create supplier")
    }


    return createSupplier





  })

  updateSupplier = serviceAsyncHandler(async (user_id, {supp_id, addharNo, description, address}) => {


    const respone = createSupplierSchema.safeParse({addharNo,description,address});

    if(!respone.success){
      throw new ApiError(400, respone.error.message)
    }

    // const getUser = await userRespository.findUserById(user_id);

    const getSupplier = await supplierRepository.findSupplierByUserId(supp_id);

    if(!getSupplier){
      throw new ApiError(404, "Supplier not found")
    }

    if( user_id.toString() !== getSupplier?.userId.toString() ){
      throw new ApiError(404, "Supplier invalid to update the data") 
    }

    const updateSupplier = await supplierRepository.updateSupplier(supp_id,
      addharNo, description, address)
    
    if(!updateSupplier){
      throw new ApiError(400, "Unable to update supplier")
    }


    return updateSupplier;



  })

  deleteSupplier = serviceAsyncHandler(async (user_id, supp_id) => {

    if(!supp_id || !user_id){
      throw new ApiError(400, "provide the supp_id")
    }

    const getSupplier = await supplierRepository.findSupplierByUserId(supp_id);

    if(!getSupplier){
      throw new ApiError(404, "Supplier not found")
    }

    if( user_id.toString() !== getSupplier?.userId.toString() ){
      throw new ApiError(404, "Supplier invalid to delete the data") 
    }

    const deleteSupplier = await supplierRepository.deleteSupplier(supp_id);

    if(!deleteSupplier){
      throw new ApiError(400, "Unable to delete supplier")
    }

    return deleteSupplier;

  })


  getSupplierDetails = serviceAsyncHandler( async (user_id, supp_id) => {

    if(!supp_id || !user_id){
      throw new ApiError(400, "provide the supp_id")
    }

    const getSupplier = await supplierRepository.findSupplierByUserId(supp_id);

    if(!getSupplier){
      throw new ApiError(404, "Supplier not found")
    }

    if( user_id.toString() !== getSupplier?.userId.toString() ){
      throw new ApiError(404, "Supplier invalid to get the data") 
    }

    const getSupplierDetails = await supplierRepository.getSupplierDetails(user_id, supp_id);

    if(!getSupplierDetails){
      throw new ApiError(400, "Unable to get supplier details")
    }

    return getSupplierDetails;



  })


}


export const supplierService = new SupplierService();
