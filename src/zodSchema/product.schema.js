import {z} from 'zod'


// here is our product zod data validation schema

const productName = z
    .string()
    .min(3, 'Product name must be at least 3 characters long')
    .max(20, 'Product name must be at most 20 characters long')
    .regex(/^[a-zA-Z0-9]+$/, 'Product name can only contain letters, numbers')

const totalQuantity = z
    .number()
    .min(1,'totalQuantity must be greater than or equal to 1')

const unitPrice = z
    .number()
    .min(0, 'Price must be greater than or equal to 0')

const category = z
    .string()
    .min(3, 'Category must be at least 3 characters long')
    .max(20, 'Category must be at most 20 characters long')
    .regex(/^[a-zA-Z0-9]+$/, 'Category can only contain letters, numbers')


const expiryDate = z
    .string() 
    .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
        message: "Invalid date format", 
    })
    .transform((dateStr) => new Date(dateStr)) 
    .refine((date) => date > new Date(), {  // here expiry date must be greater then current date
        message: "Expiry date must be in the future",
    });

const productSchema = z.object(
    {
        productName,
        total_quantity: totalQuantity,
        price : unitPrice,
        category,
        expiryDate
    }
)


export {
    productSchema,
    productName,
    totalQuantity,
    unitPrice,
    category,
    expiryDate
}



