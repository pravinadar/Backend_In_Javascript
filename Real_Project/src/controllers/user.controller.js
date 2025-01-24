import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0)
    {
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



export { registerUser }