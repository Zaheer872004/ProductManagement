import { z } from 'zod'
import { phoneNumber } from './user.schema.js'
import { email } from './user.schema.js'
import {
        productName, 
        totalQuantity, 
        unitPrice, 
        category,
        expiryDate 
    } from './product.schema.js'

// time to getting the product from the person 
/*

    productName
    total_quantity
    price
    category
    expiryDate

*/

const SupplierSchema = z.object(
    {   
        productName,
        total_quantity: totalQuantity,
        price : unitPrice,
        category,
        expiryDate,
        phone_no : phoneNumber,
        email,
        address : z.string().min(10, 'Address must be at least 10 characters long'),
        feedback : z.string().min(4, 'Feedback must be at least 4 characters long'),
    }
)

const createSupplierSchema = z.object(
    {
        addharNo : z.string().length(12, 'Addhar number must be 12 characters long'),
        description : z.string().optional(),
        address : z.string().optional()
    }
)


export {
    SupplierSchema,
    createSupplierSchema
    
}