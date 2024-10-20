import { asyncHandler } from "../helper/index.js"
import { healthCheckRepository } from "../repository/index.js"

export const healthCheckService = asyncHandler( async () => {
    
    const response = await healthCheckRepository()
    console.log(response);
    return response;

})