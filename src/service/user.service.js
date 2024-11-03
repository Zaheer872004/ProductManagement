import { ApiError, logger, serviceAsyncHandler } from "../helper/index.js";
import { userRespository } from "../repository/index.js";
import { SignInSchema, SignUpSchema, VerifyEmailSchema } from "../zodSchema/index.js";
import { otpGenerator, sendVerificationEmail } from "../utils/index.js";
export class UserService {

    constructor(){}

    registerUser = serviceAsyncHandler( async (data) => {
        // Zod validation is here...
        const result = SignUpSchema.safeParse(data)

        // console.log("till here fine")

        if(!result.success){

            console.log("till here not fine")
            
            throw new ApiError(400,result.error.message)
            
        }

        console.log("till here fine")

        const { username, email, password,phoneNumber, role} = result.data;



        const existingUser = await userRespository.findUserByUsernameOrEmail(username,email);

        // console.log("till below of existingUser") //done
        

        if(existingUser){
            if(!existingUser.isVerified){
                // give them username and email and send otp to verify email

                // send email to this email to verify email using otp.

                // generate otp
                const otp = otpGenerator();
                
                // TODO: here email send endpoint here...

                const response = await sendVerificationEmail(existingUser.email, existingUser.username, otp);

                console.log(response)

                const updateUserWithOtp = await userRespository.updateVerifyStatusWithOtp(existingUser.user_id, otp);

                // console.log(updateUserWithOtp)
                console.log("Generated OTP in side existing user", otp)

                return updateUserWithOtp;


                
            }else{
                // console.log(`User already exists`)
                throw new ApiError(400,"User already exists")
            }
        }


        const otpNewUser = otpGenerator();

        const responseNewUser = await sendVerificationEmail(email, username, otpNewUser);

        console.log("Generated OTP on new User creation", otpNewUser)

        console.log("till below mail sending")
        
        console.log(responseNewUser)

        console.log("till above mail sending")

        console.log("User creation data:", {
            username, 
            email, 
            password,
            phoneNumber, 
            role, 
            otp: parseInt(otpNewUser, 10), // Log OTP
            expiryDate: new Date(Date.now() + 5 * 60 * 1000),
            isVerified: false
        });

        const user = await userRespository.createUser({
            username, 
            email, 
            password,
            phoneNumber, 
            role, 
            otp: parseInt(otpNewUser, 10), 
            expiryDate : new Date(Date.now() + 5 * 60 * 1000),
            isVerified : false
        });

        return user;

    })


    verifyEmail = serviceAsyncHandler( async ({ username, otp }) => {

        // Zod validation is here...
        // console.log(data)


        const result = VerifyEmailSchema.safeParse({ username, otp });


        // console.log(username, otp, typeof(otp))
        const otpValue = parseInt(otp, 10);


        if(!result.success){
            throw new ApiError(400, result.error.message)
        }



        // const { username } = result.data;
        // const otp = parseInt(result.data.otp, 10);

        // console.log(username, otp, typeof(otp))

        const user = await userRespository.findUserByUsernameEmail(username);

        if(!user){
            throw new ApiError(404, "User not found")
        }


        // here check otp is correct or not
        if(user.otp !== otpValue){
            console.log("Till here all fine")
            throw new ApiError(400, "Invalid OTP")
        }

        console.log("All things are fine")


        // here check otp is exipired or not
        if(user.expiryDate <= Date.now()){
            throw new ApiError(400, "OTP expired")
        }

        const updateUserVerifyStatus = await userRespository.updateVerifyStatus(user.user_id);

        if(!updateUserVerifyStatus){
            throw new ApiError(500, "Something went wrong")
        }

        return updateUserVerifyStatus;
    })

    loginUser = serviceAsyncHandler( async (data) => {

        // Zod validation is here...
        
        const result = SignInSchema.safeParse(data);

        if(!result.success){
            throw new ApiError(400,result.error.message)
        }

        const {  password, identifier } = result.data; // identify may be a username or email...

        // check user gives and username or email
        // identifier  = identifier.includes("@") ? "email" : "username";

        // let { identifier } = result.data;
        // let email = "",username = "";

        // if(identifier.includes("@")){
        //     email = identifier;
        // }else{
        //     username = identifier;
        // }

        // identifier = email === "" ? username : email;

        // check user exist or not
        console.log(identifier, password)

        const user = await userRespository.findUserByUsernameEmail(identifier);

        if(!user){
            throw new ApiError(404,"User not found")
        }

        if(!user.isVerified){
            throw new ApiError(400, "Please verify your email first")
        }

        const isPasswordCorrect = await userRespository.checkIsPasswordCorrect(user.user_id, password);

        if(!isPasswordCorrect){
            throw new ApiError(400, "Invalid password", )
        }


        // generate a tokens Like refresh and access Token and store in db of refresh Token and return it

        const {accessToken, refreshToken} = await userRespository.generateTokens(user);

        const newUser = await userRespository.findUserByUsernameEmail(user.user_id);

        // return access token and refresh token and newUser
        
        return {accessToken, refreshToken, user:newUser};


    })
    

}

export const userService = new UserService()