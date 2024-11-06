import { ApiError,asyncHandler } from "../helper/index.js";
import { userRespository } from "../repository/index.js";
import jwt from "jsonwebtoken"

const verifyJWT = asyncHandler( async (req, res, next) => {
    
    const accessToken = req.cookies.accessToken || req.body.accessToken || req.header("authorization")?.replace("Bearer ","") 

    if(!accessToken){
        throw new ApiError(400,"Provide the accessToken");
    } 

    try {
        const decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
        
        
        // console.log('Decoded Token:', decodedToken); 

        const user = await userRespository.findUserById(decodedToken?.userId);
        
        if(!user){
            throw new ApiError(400,"provide valid access token | User not found");
        }

        // console.log(user)
    
        req.user = user;
    
        next();
    } catch (error) {
        console.log("Error while verifying the access token : "+error);
        throw new ApiError(400,"provide valid access token");
    }

    

})

export {
    verifyJWT
}