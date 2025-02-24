import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId) => {

    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })

        // validateBeforeSave: false disables Mongoose validation before saving the document.
        // The only update is setting user.refreshToken, so full validation is unnecessary.

        return { accessToken, refreshToken }
    } catch (error) {

        throw new ApiError(500, "something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {

    // get user details from the frontend
    // Validite
    // check if user already exists
    // check for images/avatar
    // upload them to cloudinary
    // create user object - create entry in db 
    // remove password and refresh token field from response
    // chexk for user creation
    // return res 

    // console.log("Request Body : ", req.body);
    // console.log("Request Headers : ", req.headers);
    // console.log(`Request URL : ${req.url}, Method : ${req.method}`);

    const { fullName, email, username, password } = req.body
    // console.log(`email : ${email}`)

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // The `.some()` method in JavaScript is an array method that tests whether at least one element in the array
    // passes the condition defined in a provided callback function. 
    // It returns true as soon as any one element satisfies the condition.

    const userExists = await User.findOne({
        $or: [{ username }, { email }]
    })

    // `$or` is used to implement the "or" operation. 
    // Here we are checking if "username" or "email" already exists. And the above is the syntax used

    if (userExists) {
        throw new ApiError(409, "user with this email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar is required")
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password

    })

    const userCreated = await User.findById(user._id).select("-password -refreshToken")
    // `.select()` selects everything by default so to remove password and refreshToken this can be done.
    // `-` means to remove

    if (!userCreated) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, userCreated, " user registered successfully ")
    )

})


const loginUser = asyncHandler(async (req, res) => {

    // req.body --> data
    // username or email
    // find the user 
    // check password
    // access and refresh token
    // send cookies

    // console.log(req.body)

    const { email, username, password } = req.body
    // console.log(email)
    // console.log(username)

    if (!(username || email)) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    // console.log(user)

    if (!user) {
        throw new ApiError(404, "user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully"
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    // Setting `refreshToken: undefined` removes the refresh token from the database,
    // ensuring full logout, preventing token reuse, and enhancing security.
    // It ensures the user must log in again to get a new token.

    // The { new: true } option ensures that the method returns the 
    // updated document instead of the old one.

    // Without new: true, Mongoose would return the document before the update.

    const options = {
        httpOnly: true,
        secure: true
    }
    // httpOnly: true → This makes the cookie inaccessible to JavaScript on 
    // the client side, preventing XSS (Cross-Site Scripting) attacks.

    // secure: true → This ensures that the cookie is only sent over HTTPS, improving security.

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User logged out successfully")
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorised request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(402, "Refresh Token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, refreshToken}=await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(
                200,
                {accessToken,refreshToken},
                "Access Token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "invalid refresh token")
    }



})
// This function refreshes the access token by verifying the incoming refresh token from cookies or the request body.
// If the token is valid, it checks if the user exists and if the refresh token matches the one stored in the database.
// If valid, it generates new access and refresh tokens, stores them as HTTP-only, secure cookies, and returns them in 
// the response. If any check fails, it throws an authentication error, ensuring secure and controlled token refresh handling

export { registerUser, loginUser, logoutUser ,refreshAccessToken }