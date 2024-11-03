import { asyncHandler, ApiError,ApiResponse } from "../helper/index.js";
import { SignInSchema, SignUpSchema } from '../zodSchema/index.js'
import { userService } from "../service/index.js";
import cookieParser from "cookie-parser";

export class UserController {

    constructor(){}

    registerController = asyncHandler( async (req, res) => {

        // TODO: check user with all data comes or not all field is neccessay checked in middleware of user

        const data = req.body;

        const response = await userService.registerUser(data)

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    response,
                    "User created successfully. Please verify your email"
                )
            )
    })

    verifyEmailController = asyncHandler( async (req, res) => {

        // TODO: check user with all data comes or not all field is neccessay checked in middleware of user


        // i'm taking two thing from user in verifyEmailController

        // 1. username
        // 2. otp

        const {otp} = req.body;
        const {username} = req.params;


        const data = {username, otp}

        const response = await userService.verifyEmail(data)

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    response,
                    "Email verified successfully"
                )
            )
    })



    loginController = asyncHandler( async (req, res) => {

        // TODO: check user with all data comes or not all field is neccessay checked in middleware of user


        const data = req.body;

        const response = await userService.loginUser(data)


        return res
            .status(201)
            // set here cookies("refreshToken")
            // set here cookies("accessToken")
            .json(
                new ApiResponse(
                    201,
                    response,
                    "User logged in successfully"
                )
            )

    })



}


export const userController = new UserController()