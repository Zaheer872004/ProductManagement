import { z } from 'zod'


const username = z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .transform((username) => username.toLowerCase());

const email = z
    .string()
    .email('Invalid email address')
    .transform((email) => email.toLowerCase());

const password = z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(50, 'Password must be at most 50 characters long');

const phoneNumber = z
    .string()
    .length(10, 'Phone number must be exactly 10 characters long')
    .regex(/^\d+$/, 'Phone number can only contain numbers');

const role = z
    .enum(['Admin', 'Retailer', 'Supplier'])


const SignUpSchema = z.object(
    {
        username,
        phoneNumber,
        email,
        password,
        role
    }
)


    




// const isVerified = z
//     .boolean()
//     .default(false);


// const products = z
//     .array(z.string())
//     .default([])

// const sales = z
//     .array(z.string())
//     .default([])


const OTP = z
    .string()
    .length(6, 'OTP must be exactly 6 characters long')
    .regex(/^\d+$/, 'OTP can only contain numbers')
    .transform((otp) => parseInt(otp,10)); // here converting string to Integer 



const SignInSchema = z.object(
    {
        identifier: z.union([username, email]),
        password
    }
)




export {
    SignUpSchema,
    SignInSchema,
    username,
    password,
    email,
    phoneNumber,
    OTP,

}