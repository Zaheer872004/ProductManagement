
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
    promiseHandler
} 