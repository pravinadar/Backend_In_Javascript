import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req,res)=>{
    // get user details from the frontend
    // Validite
    // check if user already exists
    // check for images/avatar
    // upload them to cloudinary
    // create user object - create entry in db 
    // remove password and refresh token field from response
    // chexk for user creation
    // return res 
})

export {registerUser}