
import {z} from 'zod'
import { phoneNumber } from './user.schema.js'
import { email } from './user.schema.js'
import {
        productName, 
        totalQuantity, 
        unitPrice, 
        category,
        expiryDate 
    } from './product.schema.js'

// here is Our retailer zod data validation schema

// here person requesting for the product with such attributes 
/*

    productName
    total_quantity

    * ignore below attributes
    // price
    // category
    // expiryDate

*/

const RetailerSchema = z.object(
    {
        productName,
        total_quantity : totalQuantity,
        name : z.string(),
        address : z.string().min(10, 'Address must be at least 10 characters long'),
        email,

    }
)

const address = z.string().min(10, 'Address must be at least 10 characters long').optional()




export {
    RetailerSchema,
    address
}

