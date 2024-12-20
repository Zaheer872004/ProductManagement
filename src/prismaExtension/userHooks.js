import { prismaClient } from "../config/db.config.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const prisma = prismaClient;

export const prismaMethods = prismaClient.$extends({
    query: {
        user: {
            async create({ args, query }) {
                // Here we can Hash the password before creating the user
                try {
                    if (args.data?.password) {
                        const hash = await bcrypt.hash(args.data.password, 10);
                        args.data.password = hash; // Override with hashed password
                        console.log("Hashed password:", args.data.password); // Log the hashed password
                    }
                } catch (error) {
                    throw new Error(`Error hashing password: ${error.message}`);
                }

                // Execute the original create query (creating user)
                const user = await query(args);

                // Remove the password from the user object before returning
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            },

            async update({ args, query }) {
                // Here we can Hash the password when updating the user
                try {
                    if (args.data?.password) {
                        const hash = await bcrypt.hash(args.data.password, 10);
                        args.data.password = hash; // Override with hashed password
                    }
                } catch (error) {
                    throw new Error(`Error hashing password during update: ${error.message}`);
                }

                // Execute the original update query (updating user)
                const user = await query(args);

                // Remove the password from the user object before returning
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            }
        }
    },
    // here our Custom methods like isPasswordCorrect refeshToken and accessToken
    model : {
        user : {
            async isPasswordCorrect(userId, password){
                try {
                    const user = await prismaClient.user.findUnique(
                        {
                            where : {
                                user_id : userId
                            }
                        }
                    )
                    if(!user){
                        throw new Error("User not found")
                    }
    
                    const isCorrect = await bcrypt.compare(password, user.password);
                    if(!isCorrect){
                        throw new Error("Incorrect Password")
                    }
                    return true;
    
                } catch (error) {
                    console.log(`password checked failed ${error.message}`)
                }
            },

            async generateAccessToken(user){
                try {
                    return jwt.sign(
                        { 
                            userId: user.user_id, 
                            username: user.username,
                            phoneNumber : user.phoneNumber,
                            email : user.email,
                            role: user.role 
                        }, 
                        process.env.ACCESS_TOKEN_SECRET, 
                        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d' }
                        
                    )

                    
    
                } catch (error) {
                    console.log(`Access token generation failed ${error.message}`)
                }
            },
            async generateRefreshToken(user){
                try {
                    return jwt.sign(
                        { 
                            userId: user.user_id, 
                            username: user.username,
                            role: user.role 
                        }, 
                        process.env.REFRESH_TOKEN_SECRET, 
                        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '5d' }
                        
                    )

                    
    
                } catch (error) {
                    console.log(`refresh token generation failed ${error.message}`)
                }
            },
    
        }
    }
    
});



