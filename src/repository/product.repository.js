import { ApiError } from "../helper/ApiError.js";
import { prisma } from "../prismaExtension/userHooks.js"




class ProductRepository {
  constructor() { }


  createSingleProduct = async (productName, total_quantity, price, category, expiryDate, user_id, supplyBatch) => {


    const product = await prisma.product.create({
      data: {
        productName,
        total_quantity,
        price,  // here unit price talking about
        category,
        expiryDate,


        productSuppliers: {
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


  getUserProductDetails = async (user_id, prod_id) => {

    try {

      const response = await prisma.user.findUnique(
        {
          where: {
            user_id
          },
          productUser: {
            where: {
              userId: user_id
            }
          }
        }
      )

      if (!response) {
        throw new ApiError(400, "User not found")
      }

      return response


    } catch (error) {
      console.log(error)
      throw new ApiError(400, error.message);
    }




  }

  updateSingleProduct = async (prod_id, { productName, total_quantity, price, category, expiryDate, user_id }) => {
    try {
      const response = await prisma.product.update(
        {
          where: {
            prod_id
          },
          data: {
            productName,
            total_quantity,
            price,
            category,
            expiryDate,
          }
        }
      )

      if (!response) {
        throw new ApiError(400, "Product not found")
      }

      return response

    } catch (error) {
      console.log(error)
      throw new ApiError(400, error.message);
    }

  }


  getSingleProduct = async (prod_id) => {

    try {
      const response = await prisma.product.findUnique(
        {
          where: {
            prod_id
          }
        }
      )

      if (!response) {
        throw new ApiError(400, "Product not found")
      }

      return response

    } catch (error) {
      console.log(error)
      throw new ApiError(400, error.message);
    }

  }

  getSingleProductDetailsByUsername = async (prod_id, username) => {
    try {
      const response = await prisma.product.findUnique({
        where: {
          prod_id, // Assuming `prod_id` is the primary key in the Product model
        },
        include: {
          // Include product users and filter by username
          productUsers: {
            where: {
              user: {
                username: username, // Filter product users by username
              },
            },
            include: {
              user: {
                include: {
                  suppliers: true, // Include supplier details if the user is a supplier
                },
              },
            },
          },
          // Include supplier details associated with the product
          suppliers: {
            include: {
              supplier: {
                include: {
                  user: true, // Include user details for suppliers
                },
              },
            },
          },
          // Include retailer details associated with the product
          retailers: {
            include: {
              retailer: {
                include: {
                  user: true, // Include user details for retailers
                },
              },
            },
          },
          // Include other product relationships if needed
          sales: true, // Include sales information
        },
      });
  
      if (!response) {
        throw new ApiError(400, "Product not found");
      }
  
      return response;
    } catch (error) {
      console.error(error);
      throw new ApiError(400, error.message);
    }
  };
  
  


  AllProductDetailsByUsername = async (username) => {
    try {
      const response = await prisma.product.findMany({
        where: {
          productUsers: {
            some: {
              user: {
                username: username, // Match by username
              },
            },
          },
        },
        include: {
          productUsers: {
            include: {
              user: {
                include: {
                  suppliers: true, // Include Supplier details if user is a supplier
                },
              },
            },
          },
          suppliers: {
            include: {
              supplier: {
                include: {
                  user: true, // Include User details for suppliers
                },
              },
            },
          },
          retailers: true, // Include ProductRetailer details
          sales: true,     // Include Sales details
        },
      });

      if (!response) {
        throw new ApiError(400, "Product not found")
      }

      return response;

    } catch (error) {
      console.log(error);
      throw new ApiError(400, error.message);
    }
  }

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