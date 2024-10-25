import { asyncHandler, ApiError,ApiResponse } from "../helper";
import { SignInSchema, SignUpSchema } from '../zodSchema/index.js'
import { prisma, prismaMethods } from "../prismaExtension/userHooks.js"

export class User {

    constructor(){

    }

    register = asyncHandler( async (req, res) => {

        const { username, email, password, phoneNumber, role="Retailer" } = req.body;

        if([username, email, password, phoneNumber].some(x => x === "")){
            throw new ApiError("All fields are required", 400)
        }

        const result = SignUpSchema.safeParse({username,phoneNumber,email,password,role})

        if(!result.success){
            throw new ApiError(result.error.message, 400)
        }

        // const userExist = await prisma.user.findFirst(
        //     {
        //         where : {
        //             AND : [
        //                 { isVerified : true },
        //                 {
        //                     OR : [ 
        //                         { username : result.data.username },
        //                         { email : result.data.email }
        //                     ]
        //                 }
        //             ]
        //         }
        //     }
        // )

        const userExist = await prisma.user.findFirst(
            {
                where : {
                    OR : [ 
                        { username : result.data.username },
                        { email : result.data.email }
                    ]
                }
            }
        )

        if(userExist){
            // if user exist and their isVerified is false then send otp to verify email
            if(!userExist.isVerified){
                console.log("Your email is not verified yet. Please verify your email using this otp sended to your email.")
                // send email to this email to verify email using otp.
                /* 
                // return the respone here and exit from here.
                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            200,
                            "User created successfully. Please verify your email",
                            {user : userExist}
                        )
                    )
                */
            }
            else{
                throw new ApiError("User already exist with this username or email", 400)
            }
        }

        // Hash the password before creating the user
        // const hashedPassword = await prismaMethods.hashedPassword()

        // Oops no need to hash password because we used prehook to hash password.

        const user = await prisma.user.create({
            data : {
                username : result.data.username,
                email : result.data.email,
                password : result.data.password,
                phoneNumber : result.data.phoneNumber,
                role : result.data.role
            }
        })

        // send email to this email to verify email using otp.
        /* 
        // return the respone here and exit from here.
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "User created successfully. Please verify your email",
                    {user : user}
                )
            )
        */

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "User created successfully. Please verify your email",
                user
            )
        )
    })


    login = asyncHandler( async (req, res) => {

        const { username, email, password } = req.body;

        if (!username && !email) { // if both are true then throw error
            throw new ApiError("Either username or email is required", 400);
        }

        // let identifier = "";

        // if(!username){
        //     identifier = email
        // }
        // else{
        //     identifier = username
        // }

        const identifier = username || email;
        
        const result = SignInSchema.safeParse({identifier,password})

        if(!result.success){
            throw new ApiError(result.error.message, 400)
        }


        const user = await prisma.user.findFirst(
            {
                where : {
                    OR : [ 
                        { username : result.data.identifier },
                        { email : result.data.identifier }
                    ]
                }
            }
        )

        if(!user){
            throw new ApiError("User not found", 404)
        }

        if(!user.isVerified){
            throw new ApiError("Please verify your email", 400)
        }

        const hashedPassword = await prismaMethods.isPasswordCorrect(user.user_id, result.data.password);

        if(!hashedPassword){
            throw new ApiError("Invalid password", 400)
        }

        



    })












}