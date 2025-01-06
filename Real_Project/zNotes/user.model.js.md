```js
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

export const User = mongoose.model("User", userSchema);

```

# Notes

```js
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
```
## Explanation of the above code
### Explanation of `userSchema.pre("save")`
### What is `pre`?
- **Purpose**:
    - `pre` is a Mongoose middleware function.
    - It allows you to execute code before a specified event occurs.
- **Structure**:
    - `schema.pre(event, function(next) { ... })`
    - It runs whenever the specified `event` (like `save`, `remove`, etc.) is triggered on a document.

### What is `"save"`?
- **Purpose**:
    - The `"save"` event is triggered whenever you call `.save()` on a Mongoose document.
    - Example:
        ```js
        const user = new User({ username: "john", password: "mypassword" });
        await user.save(); // Triggers the "save" event
        ```
    - During the `save` process, Mongoose inserts or updates the document in the MongoDB database.

- `pre("save")` **Hook**:

    - It runs before the document is saved to the database.
    - Example use cases:
        - Hashing a password.
        - Validating data.
        - Modifying fields automatically (e.g., adding a timestamp).

### What Does the `pre` Middleware Do Here?
In this code:
```js
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err); // Pass error to middleware
  }
});
```
1. Password Hashing :

    - It hashes the `password` field before saving the document to the database.
    - **Why?** => Storing plain-text passwords is insecure.

2. `this.isModified("password")` :

    - Ensures the middleware only hashes the password if it has been modified.
    - This avoids rehashing the password unnecessarily when updating other fields.

3. `next`:

    - This is a `callback` provided by Mongoose.
    - It tells Mongoose:
        - The middleware is done and the save process can proceed (`next()`).
        - If there’s an error, pass it to Mongoose for further handling (`next(err)`).

### What is next?
**Purpose:**
- `next` is a callback function used in Mongoose middleware.
- It is required to:
    - Signal the end of the current middleware.
    - Pass control to the `next` middleware in the chain.
    - Handle errors by passing them as arguments ( `next(err)` ).

**When is next Provided?**
- Mongoose automatically provides next as an argument to middleware functions like pre or post.

**Types of Middleware :**
- **Pre-Middleware**: Runs before an event (like "save").
- **Post-Middleware**: Runs after an event (e.g., "save").

**How `next` Works:**
- Call `next()`: Indicates the middleware has finished successfully.
- Call `next(err)`: Indicates an error occurred and stops further processing.
- Not Calling `next()`: Mongoose hangs and the event never completes.

**Example: Flow of next**

**Scenario 1: Success**
```js
userSchema.pre("save", function (next) {
  console.log("Pre-save middleware triggered.");
  next(); // Signals that middleware is done
});

// Usage
await user.save(); // Logs "Pre-save middleware triggered."
```

**Scenario 2: Error Handling**
```js
userSchema.pre("save", function (next) {
  const error = new Error("Something went wrong!");
  next(error); // Passes error to Mongoose
});

// Usage
try {
  await user.save();
} catch (err) {
  console.error(err.message); // Logs "Something went wrong!"
}
```

**Scenario 3: Forgetting to Call next**
```js
userSchema.pre("save", function (next) {
  console.log("Middleware started.");
  // Forgot to call next()
});

// Usage
await user.save(); // Hangs forever because `next()` was not called
```

### What Happens in the Code?
1. When `next()` is Called:
    - Mongoose proceeds to:
        - Execute the next middleware in the chain (if any).
        - Complete the save operation (writing to the database).

2. When `next(err)` is Called:
    - Mongoose stops further execution.
    - The error is passed to:
        - Custom error-handling middleware.
        - Or it propagates back to the function that initiated the save.

3. When `next()` is Not Called:
    - Mongoose **hangs** indefinitely, as it waits for the middleware to signal completion.

### How is `next` Built-In?
- **Where It Comes From :**
    - Mongoose provides `next` as part of its middleware system.
    - You don’t define it; Mongoose injects it when the middleware is invoked.

- **How It Works :** 
    - Mongoose internally maintains a chain of middleware for each lifecycle event (e.g., `save`, `remove`).
    - It passes `next` down the chain to ensure proper flow control.

### In Simple Terms
- The `pre("save")` function is a hook that runs before saving a document.
- The `next` callback is like a "green light" for Mongoose:
    - Call `next()` to continue the save operation.
    - Call `next(err)` to stop and report an error.
- If you forget to call `next()`, Mongoose waits forever, assuming the operation isn't complete.

