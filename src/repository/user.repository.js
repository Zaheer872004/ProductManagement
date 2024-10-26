import { asyncHandler } from "../helper";
import { prisma, prismaMethods } from "../prismaExtension/userHooks.js"


export class UserRepository {

    constructor(){

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
    async createUser({username, email, password,phoneNumber, role}){
        const user = await prisma.user.create({
            data : {
                username,
                email,
                password,
                phoneNumber,
                role
            }
        })
        return user;
    }

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

    async checkIsPasswordCorrect(user_id, password){
        const isCorrect = await prismaMethods.isPasswordCorrect(user_id, password);
        return isCorrect
    }

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

