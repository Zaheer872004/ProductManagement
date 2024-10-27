import { asyncHandler } from "../helper/index.js";
import { prisma, prismaMethods } from "../prismaExtension/userHooks.js"


export class UserRepository {

    constructor(){

    }

    // update user otp and existing otp and expiryDate
    async updateVerifyStatusWithOtp(user_id, otp){

        return await prisma.user.update({
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

        const isEmail = identifier.includes('@'); 

        return
            await prisma.user.findFirst(
                {
                    where: 
                        isEmail ? { email: identifier } : { username: identifier }
                }
            );
    }

    // creating a user with their data
    async createUser({username, email, password,phoneNumber, role, otp, expiryDate}){
        const user = await prisma.user.create({
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
        const isCorrect = await prismaMethods.isPasswordCorrect(user_id, password);
        return isCorrect
    }

    // generating access token and refresh token
    async generateTokens(user){

        const accessToken = await prismaMethods.generateAccessToken(user);

        const refreshToken = await prismaMethods.generateRefreshToken(user);

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

