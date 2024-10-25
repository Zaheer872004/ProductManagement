import { z } from 'zod'
import { phoneNumber } from './user.schema'
import { email } from './user.schema'
import {
        productName, 
        totalQuantity, 
        unitPrice, 
        category,
        expiryDate 
    } from './product.schema'

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


export {
    SupplierSchema
    
}