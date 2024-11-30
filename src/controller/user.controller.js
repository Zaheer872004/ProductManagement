import { asyncHandler, ApiError,ApiResponse,options } from "../helper/index.js";
import { SignInSchema, SignUpSchema, password } from '../zodSchema/index.js'
import { userService } from "../service/index.js";
import cookieParser from "cookie-parser";

export class UserController {

    constructor(){}

    registerController = asyncHandler( async (req, res) => {

        // TODO: check user with all data comes or not all field is neccessay checked in middleware of user

        
        // const {username, email, password, phoneNumber, role} = req.body;

        // console.log(username, email, password, phoneNumber, role);
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

        let {otp} = req.body;
        const {username} = req.params;

        // otp = parseInt(otp,10)

        // console.log(username, otp)

        const data = {username , otp}

        // console.log("data", username, otp, typeof(otp));

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
            .cookie("accessToken", response.accessToken, {options})
            .cookie("refreshToken", response.refreshToken, {options})
            .json(
                new ApiResponse(
                    201,
                    response,
                    "User logged in successfully"
                )
            )

    })




    // patch method
    updatePassword = asyncHandler(async(req,res) => {

        const {user_id} = req.user;
        const {password, newPassword, confirmPassword } = req.body;

        const response = await userService.updatePassword(user_id,{password,  newPassword, confirmPassword})

        if(!response){
            throw new ApiError(400,"Unable to update password");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    response,
                    "password updated Successfully"
                )
            )


    })



    // patch method
    updateProfile = asyncHandler(async(req,res) => {

        const {user_id} = req.user;
        const {username, phoneNumber, email} = req.body;

        const response = await userService.updateProfile(user_id,{username, phoneNumber, email})

        if(!response){
            throw new ApiError(400,"Unable to update profile");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    response,
                    "profile updated Successfully"
                )
            )

    })

    getUserDetails = asyncHandler( async (req, res) => {

        const {user_id} = req.user;

        const response = await userService.getUserDetails(user_id)

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    response,
                    "User fetch Details successfully"
                )
            )


    })

    //  other function like getAllProducts,


}


export const userController = new UserController()