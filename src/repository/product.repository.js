import { prisma } from "../prismaExtension/userHooks.js"




class ProductRepository {
  constructor() {}


  createSingleProuct = async (productName, total_quantity, price, category, expiryDate, user_id,  supplyBatch) => {


    const product = await prisma.product.create({
      data: {
        productName,
        total_quantity,
        price,
        category,
        expiryDate,
  
        
        suppliers: {
          create: {
            supplierId: user_id,     
            supplyBatch: supplyBatch,   
          },
        },
  
        
        productUsers: {
          create: {
            userId: user_id,             
          },
        },
      },

      include: {
        suppliers: true,
        productUsers: true,
      },
    });
  
    return product;
  };






}

export const productRepository = new ProductRepository();




// // Track the user who added the product
        // productUsers: {
        //   create: {


        //     // user: {
        //     //   connect: { user_id: userId }, // Link existing user
        //     // },
        //   },
        // },