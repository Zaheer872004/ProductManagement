import { ApiError, logger, serviceAsyncHandler } from "../helper/index.js";
import { userRespository } from "../repository/index.js";
import { password, SignInSchema, SignUpSchema, VerifyEmailSchema,profile, phoneNumber, email } from "../zodSchema/index.js";
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



        const existingUser = await userRespository.findUserByUsernameOrEmail(username,email); // true

        // console.log("till below of existingUser") //done
        

        if(existingUser){  // true
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


    updatePassword = serviceAsyncHandler( async (user_id, {password, newPassword, confirmPassword} ) => {

        if([password,newPassword,confirmPassword].some((value) => value.trim() === "")){
            throw new ApiError(400,"provide all the credentials");
        }

        const oldPassword = password.safeParse(password);
        const currentPassword = password.safeParse(newPassword);

        if(!oldPassword.success || !currentPassword.success){
            throw new ApiError(400, "provide the valid password ")
        }

        if( newPassword !== confirmPassword){
            throw new ApiError(400, "confirmPassword not match");
        }

        const user = await userRespository.findUserById(user_id);

        if( user.user_id.toString() !== user_id.toString() ){
            throw new ApiError(400, "User not found | user not authorize to update password");
        }

        const isPasswordCorrect = await userRespository.checkIsPasswordCorrect(user_id,password);

        if(!isPasswordCorrect){
            throw new ApiError(400,"Please provide the correct password")
        }

        // try...
        // you can send the otp of user email
        // once user enter the otp then update the password in the database;

        const updatePassword = await userRespository.updatePassword(user_id,newPassword);

        if(!updatePassword){
            throw new ApiError(400,"in service layer password not updated")
        }

        return true;


    })

    updateProfile = serviceAsyncHandler( async (user_id, {username, phoneNumber, email}) => {

        const response = profile.safeParse({username, phoneNumber, email})

        if(!response.success){
            throw new ApiError(400, response.error.message)
        }

        const user = await userRespository.findUserById(user_id);

        if( user.user_id.toString() !== user_id.toString() ){
            throw new ApiError(400, "User not found | user not authorize to update profile");
        }

        const updateProfile = await userRespository.updateProfile(user_id, {
            username,
            phoneNumber,
            email
        });

        if(!updateProfile){
            throw new ApiError(400,"in service layer profile not updated")
        }

        return updateProfile;

    })

    getUserDetails = serviceAsyncHandler( async (user_id) => {

        const user = await userRespository.findUserById(user_id);

        // this is redundent code does not make sense
        if( user.user_id.toString() !== user_id.toString() ){
            throw new ApiError(400, "User not found | user not authorize to get user details");
        }

        return user;




    })
    

}

export const userService = new UserService()