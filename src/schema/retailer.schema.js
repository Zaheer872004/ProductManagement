
import {z} from 'zod'
import { phoneNumber } from './user.schema'
import { email } from './user.schema'
import {
        productName, 
        totalQuantity, 
        unitPrice, 
        category,
        expiryDate 
    } from './product.schema'

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


export {
    RetailerSchema,
}

