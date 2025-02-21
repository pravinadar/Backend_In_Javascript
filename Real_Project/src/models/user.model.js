import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // Optimizes query performance for username
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // Useful for frequent email lookups
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true, // Optimizes search by full name
        },
        avatar: {
            type: String, // Cloudinary URL
            required: true,
        },
        coverImage: {
            type: String, // Cloudinary URL
            default: null, // Optional field with default
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
            default: null, // Optional field with default
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err); // Pass error to middleware
    }
});

// Compare plain-text password with hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw new Error("Password comparison failed.");
    }
};

// Generate an access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

// jwt.sign() creates a signed JWT (JSON Web Token).

// Payload: Contains user details (_id, email, etc.).
// `expiresIn` sets token expiration.


// Generate a refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};
// A refresh token is a long-lived credential used in conjunction with an access token to maintain user 
// authentication without requiring them to log in again. 

// It is part of the token-based authentication strategy to improve security and enhance the user experience.

export const User = mongoose.model("User", userSchema);
