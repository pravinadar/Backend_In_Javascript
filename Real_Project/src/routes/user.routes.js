import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { logoutUser } from "../controllers/user.controller.js";
const router = Router()
router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)

// Middleware (upload.fields())
//     The middleware is executed before the `registerUser` controller function.
//     It configures multer to process files uploaded in the form fields named avatar and coverImage.
//     It ensures only specific fields are processed as file uploads.
//     You can enforce limits like `maxCount` to prevent abuse.

// secured route

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)

export default router

// Single Default Export:
//     - This code uses export default to export the router object.
//     - The ***imported name*** (router) ***can be anything***, as the default export does not require the name to match.
//     - A module can only have one default export.