import { ApiError } from "./ApiError.js";

// using async await way
const asyncHandler = (requestHandler) => {
    return async (req,res,next) => {
        try {
            await requestHandler(req,res,next)
        } catch (error) {
            next(error);
        }
    }
}

// catchAsync.js
const serviceAsyncHandler = (fn) => {
    return async (...data) => {
        try {
            return await fn(...data);
        } catch (error) {
            // Handle or re-throw the error
            console.log("Getting Error in serviceAsyncHandler : "+error);
            // throw error;
            throw new ApiError(400, error.message || "User already exists")
        }
    };
};



// using promise way
const promiseHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise
        .resolve(requestHandler(req,res,next))
        .catch(error => next(error))
        
    }
}


export {
    asyncHandler,
    promiseHandler,
    serviceAsyncHandler
} 