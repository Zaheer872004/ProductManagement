import { asyncHandler } from "../helper/index.js";
import { prisma, prismaMethods } from "../prismaExtension/userHooks.js"


export class UserRepository {

    constructor(){

    }

    // update user otp and existing otp and expiryDate
    async updateVerifyStatusWithOtp(user_id, otp){

        return await prismaMethods.user.update({
            where : {
                user_id
            },
            data : {
                otp,
                expiryDate : new Date(Date.now() + 5 * 60 * 1000) // half hour...
            }
        })
    }

    // getting the user by username or email
    async findUserByUsernameOrEmail(username,email){
        return await prisma.user.findFirst(
            {
                where : {
                    OR : [ 
                        { username : username },
                        { email : email }
                    ]
                }
            }
        )
        
    }

    // getting the user by username or email either one of them
    async findUserByUsernameEmail(identifier) {
        const value = String(identifier).toLowerCase();
        const isEmail = value.includes("@");
    
        return await prisma.user.findFirst({
            where: isEmail ? { email: value } : { username: value }
        });
    }

    // creating a user with their data
    async createUser({username, email, password,phoneNumber, role, otp, expiryDate}){
        const user = await prismaMethods.user.create({
            data : {
                username,
                email,
                password,
                phoneNumber,
                role,
                otp,
                expiryDate
            }
        })
        return user;
    }

    // updateing user Status isVerified
    async updateVerifyStatus (user_id){

        const updateStatus = await prisma.user.update(
            {
                where : {
                    user_id
                },
                data : {
                    isVerified : true
                }
            }
        )

        return updateStatus
    }

    // checking user is password correct or not
    async checkIsPasswordCorrect(user_id, password){
        const isCorrect = await prismaMethods.user.isPasswordCorrect(user_id, password);
        return isCorrect
    }

    // generating access token and refresh token
    async generateTokens(user){

        const accessToken = await prismaMethods.user.generateAccessToken(user);

        const refreshToken = await prismaMethods.user.generateRefreshToken(user);

        await prisma.user.update(
            {
                where : {
                    user_id : user.user_id
                },
                data : {
                    refreshToken
                }
            }
        )

        return {accessToken, refreshToken}

    }
    

}

export const userRespository = new UserRepository();

