// Method 2
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        return Promise.resolve(requestHandler(req, res, next))
            .catch((error) => next(error))
    }
}




// Method 1
// asyncHandler is a higher-order function:
// Accepts a function func as input.
// Returns a new function that wraps func with try-catch for error handling.
// res.status() is a method used to set the HTTP status code of the response that will be sent back to the client.

// const asyncHandler = (func) => async (req, res, next) => {
//     try {
//         await func(req, res, next); // Executes the passed function

//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })

//     }
// }




export { asyncHandler }