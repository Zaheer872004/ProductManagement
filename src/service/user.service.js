import { ApiError, asyncHandler } from "../helper";
import { userRespository } from "../repository";
import { SignInSchema, SignUpSchema, VerifyEmailSchema } from "../zodSchema";


export class UserService {

    constructor(){}

    registerUser = asyncHandler( async (data) => {
        // Zod validation is here...
        const result = SignUpSchema.safeParse(data)

        if(!result.success){
            throw new ApiError(result.error.message, 400)
        }

        const { username, email, password,phoneNumber, role} = result.data;

        const existingUser = await userRespository.findUserByUsernameOrEmail(username,email);

        if(existingUser){
            if(!existingUser.isVerified){
                // give them username and email and send otp to verify email

                // send email to this email to verify email using otp.

                TODO: // here email send endpoint here...
                return;
            }else{
                throw new ApiError("User already exists", 400)
            }
        }

        const user = await userRespository.createUser({username, email, password,phoneNumber, role});

        return user;

    })


    verifyEmail = asyncHandler( async (data) => {

        // Zod validation is here...

        const result = VerifyEmailSchema.safeParse(data);

        if(!result.success){
            throw new ApiError(result.error.message, 400)
        }

        const { username, otp } = result.data;

        const user = await userRespository.findUserByUsernameEmail(username);

        if(!user){
            throw new ApiError("User not found", 404)
        }


        // here check otp is correct or not
        if(user.OTP !== otp){
            throw new ApiError("Invalid OTP", 400)
        }

        // here check otp is exipired or not
        if(user.expiryDate < Date.now()){
            throw new ApiError("OTP expired", 400)
        }

        const updateUserVerifyStatus = await userRespository.updateVerifyStatus(user.user_id);

        if(!updateUserVerifyStatus){
            throw new ApiError("Something went wrong", 500)
        }

        return updateUserVerifyStatus;
    })

    loginUser = asyncHandler( async (data) => {

        // Zod validation is here...
        
        const result = SignInSchema.safeParse(data);

        if(!result.success){
            throw new ApiError(result.error.message, 400)
        }

        const { identifier, password } = result.data; // identify may be a username or email...

        // check user gives and username or email
        identifier  = identifier.contain("@") ? "email" : "username";

        // check user exist or not
        

        const user = await userRespository.findUserByUsernameEmail(identifier);

        if(!user){
            throw new ApiError("User not found", 404)
        }

        if(!user.isVerified){
            throw new ApiError("Please verify your email first", 400)
        }

        const isPasswordCorrect = await userRespository.checkIsPasswordCorrect(user.user_id, password);

        if(!isPasswordCorrect){
            throw new ApiError("Invalid password", 400)
        }

        // generate a tokens Like refresh and access Token and store in db of refresh Token and return it

        const {accessToken, refreshToken} = await userRespository.generateTokens(user);

        const newUser = await userRespository.findUserByUsernameEmail(user.user_id);

        // return access token and refresh token and newUser
        
        return {accessToken, refreshToken, user:newUser};


    })
    

}

export const userService = new UserService()