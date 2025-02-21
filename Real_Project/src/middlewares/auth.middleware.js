import { jwt } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // jwt.verify(token, secretKey, options, callback)
        // It takes:
        // token → The JWT to verify.
        // secretKey → The secret key used to sign the token. (signed in the `generateAccessToken()` and `generateRefreshToken()` function in the user.model.js file)
        // (Optional) options → Extra settings (e.g., ignoring expiration).
        // (Optional) callback → A function to handle the verification result asynchronously.


        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access token")
        }

        req.user = user;
        next()

        //req.user = user
        // By assigning user to req.user, we are adding a new property (user) to the request object.
        // The next() function tells Express to move on to the next middleware or route handler in the chain.
        // Since the same req object is used throughout, the user data attached earlier remains available.
        // Any middleware or route handler that is executed after this middleware can access req.user and use the user information.

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access token")
    }

})

// req.cookies?.accessToken → Gets the token from cookies (used in browser authentication).

// req.header("Authorization")?.replace("Bearer ", "") → Extracts the token from the Authorization header (used in API requests).
// Authorization headers use "Bearer <token>" format.
// .replace("Bearer ", "") extracts only the raw token for verification.

// If the token exists in cookies, it's used; otherwise, the header token is used. This ensures flexibility in authentication.

// In an Express middleware, the typical function signature is (req, res, next). 
// If you don't need to use the `res` (response) object in your middleware, you can replace 
// its name with an underscore (_) to indicate it's intentionally unused. 
// This is simply a convention to show that the parameter is there to satisfy the function signature 
// but won't be used in the function's logic.