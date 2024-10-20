import { healthCheckService } from "../service/index.js"
import { 
    asyncHandler,
    ApiError,
    ApiResponse 
} from "../helper/index.js"





export const healthCheckController = asyncHandler( async (req,res) => {
    
    const response  = await healthCheckService()
    console.log(response);
    
    // if(!response){
    //     throw new ApiError(400,"Health check failed & unsuccessfull")
    // }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            response,
            "Health check success"
        )
    )

})