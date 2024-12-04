import { prisma } from "../prismaExtension/userHooks.js";
import { ApiError } from "../helper/index.js";




class RetailerRepository {

  

  createRetailer = async (user_id, address) => {

    try {

      const response = await prisma.retailer.create(
        {
          data : {
            userId : user_id,
            address
          }
        }
      )

      return response


    } catch (error) {
      console.log(error);
      throw new ApiError(400, error.message)
    }


  }

  findRetailerById = async (retailer_id) => {

    try {

      const response = await prisma.retailer.findUnique(
        {
          where : {
            retailer_id
          }
        }
      )

      return response;

    } catch (error) {
      console.log(error)
      throw new ApiError(400, error.message);
    }

  }

  updateRetailer = async (retailer_id, {address}) => {
    try {
      
      return await prisma.retailer.update(
        {
          where : {
            retailer_id
          },
          data : {
            address
          }
        }
      )

    } catch (error) {
      console.log(error)
      throw new ApiError(400, error.message);
    }
  }

  deleteRetailer = async (retailer_id) => {
    try {
      return await prisma.retailer.delete(
        {
          where : {
            retailer_id
          }
        }
      )
    } catch (error) {
      console.log(error)
      throw new ApiError(400, error.message);
    }
  }

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

  findRetailerDetails = async (retailer_id) => {
    try {

      const response = await prisma.retailer.findUnique(
        {
          where : {
            retailer_id
          },
          select : {
            userId : true,
            address : true,
            user : {
              select : {
                username : true,
                email : true,
                phoneNumber : true,
              }
            }
          }
        }
      )

      if(!response){
        throw new ApiError(400, "Retailer not found")
      }

      return response;
      
    } catch (error) {
      console.log(error)
      throw new ApiError(400, error.message);
    }
  }



  findAllRetailer = async () => {
    try {
      const response = await prisma.retailer.findMany(
        {
          select : {
            retailer_id : true,
            address : true,
            user : {
              select : {
                username : true,
                email : true,
                phoneNumber : true,
              }
            }
          }
        }
      )
      return response;
    } catch (error) {
      console.log(error)
      throw new ApiError(400, error.message);
    }
  }

}


export const retailerRepository = new RetailerRepository();