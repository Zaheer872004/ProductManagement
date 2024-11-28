import { ApiError,  } from "../helper/index.js";
import { prisma,  } from "../prismaExtension/userHooks.js"





class SupplierRepository { 

  constructor(){}

  findSupplierByUserId = async (user_id) => {
    try {
      return await prisma.supplier.findUnique(
        {
          where : {
            userId : user_id
          }
        }
      )
    } catch (error) {
      console.log("Error in findSupplierByUserId :: "+error)
      throw error
    }
  }


  createSupplier = async (user_id, {addharNo,description = "",address = ""}) => {


    try {
      
      const response = await prisma.supplier.create(
        {
          data : {
            userId : user_id,
            addharNo,
            description,
            address
          }
        }
      )

      if(!response){
        throw new ApiError(400, "Unable to create supplier")
      }

      return response;

    } catch (error) {
      console.log("Errror in createSupplier :: "+error)
      throw error
    }
  }

  updateSupplier = async (supp_id, addharNo, description = "", address = "") => {

    try {

      const respone = await prisma.supplier.update(
        {
          where : {
            supp_id
          },
          data : {
            addharNo,
            description,
            address
          }
        }
      )

      if(!respone){
        throw new ApiError(400, "Unable to update supplier")
      }

      return respone;

    } catch (error) {
      console.log("Errror in createSupplier :: "+error)
      throw error
    }

  }


  deleteSupplier = async (supp_id) => {


    try {

      const response = await prisma.supplier.delete(
        {
          where : {
            supp_id
          }
        }
      )

      if(!response){
        throw new ApiError(400, "Unable to delete supplier")
      }

      return response;


    } catch (error) {
      console.log("Errror in createSupplier :: "+error)
      throw error
    }





  }

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

  getSupplierDetails = async (user_id, supp_id) => {

    try {

      // const respone = await prisma.supplier.findUnique(
      //   {
      //     where : {
      //       supp_id
      //     },
      //     include : {   // here include return all the fields
      //       user : true
      //     }
      //   }
      // )

      const respone = await prisma.supplier.findUnique(
        {
          where : {
            supp_id
          },
          select : {
            supp_id : true,
            addharNo : true,
            description : true,
            address : true,
            user : {
              select : {
                username : true,
                phoneNumber : true,
                email : true,
              }
            }
          }
        }
      )

      if(!respone){
        throw new ApiError(404, "Supplier not found")
      }

      return respone;


    } catch (error) {
      console.log("Errror in createSupplier :: "+error)
      throw error
    }



  }





}



export const supplierRepository = new SupplierRepository();
