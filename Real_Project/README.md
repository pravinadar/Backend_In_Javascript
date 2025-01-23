## 1. initialized npm project

## 2. made the .gitignore file and used gitignore generator to generate the content in it

**Why Use `.gitkeep` file ?**

- **To Track Empty Directories** : If your project structure relies on certain directories being present (e.g., logs/, temp/, or uploads/), you can use `.gitkeep` to ensure those directories exist in the repository.

## 3. made `.env` and `.env.sample` file

## 4. made the src directory in which made the `app.js` , `constants.js` and `index.js`

## 5. Added `"type":"module"` in the `package.json` file

**Why use type: "module"?**

- It enables native support for ES Modules in Node.js.
- With `"type": "module"`, files with the .js extension are treated as ES Modules by default.
- ES Modules use `import/export` syntax, which is modern and cleaner compared to the `require/module.exports` used in CommonJS.

## 6. used `npm i -D nodemon` to install `nodemon` as dev dependency

**What/Why is Nodemon?**

- `nodemon` is a utility tool for Node.js that automatically restarts your server when it detects file changes.
- It’s particularly useful during development.

## 7. Edited `package.json` file.

```json
"scripts": {
    "dev": "nodemon src/index.js"
  }
```

Added the above content in the file

## 8. Made all the empty folders to understand the structure of the project

The folders are `controllers` , `db` , `middlewares` , `models` , `routes` , `utils` .

## 9. Installed `prettier` as a dev dependency

**What is Prettier?**

- Prettier is an opinionated code formatter that ensures consistent coding style across your project.
- It automatically reformats code to follow a predefined style, reducing debates about style and improving code readability.

**Why Use Prettier?**

- **Avoid Formatting Disputes**
- **Save Time**
- **Readability**
- **Toolchain Integration**

**What is the `.prettierignore` file ?**

- The `.prettierignore` file tells Prettier which files or directories to ignore during formatting.
- It works similarly to `.gitignore` .

**What is the `.prettierrc` file ?**

- The `.prettierrc` file is a configuration file for Prettier where you can customize its behavior to suit your project’s needs.
- It defines the rules and formatting style.

## 10. Installed `mongoose` , `express` and `dotenv` packages

#### Using `try-catch` or `promises` for establishing a database connection is professional because it ensures robust error handling during critical operations.

#### For database interactions, `async-await` is preferred as it makes asynchronous code more readable, maintainable, and avoids callback hell.

Both approaches align with modern development best practices and improve application stability and scalability.

### The `dotenv` library loads environment variables from a `.env` file into `process.env`.

## 11. Created a cluster in mongoDB Atlas

In the context of computing, a cluster refers to a collection of interconnected computers or servers that work together as a unified system to achieve specific goals. Clusters are commonly used for performance, availability, scalability, or redundancy. **In the context of MongoDB Atlas, a cluster is a managed set of MongoDB servers (nodes) that work together to host and manage your databases**.

### Process to Create a Cluster ( 2024 )

1. Sign Up and Log In
   - Go to MongoDB Atlas and sign up for an account if you don’t already have one.
   - Log in to your MongoDB Atlas account.
2. Create a New Project

- In the Projects tab, click on the New Project button.
- Name your project and assign team members if needed.

3. Build a Cluster

   - Inside the project, click the Build a Cluster button.
   - Choose a cluster type:
     - Shared Cluster (Free Tier): Ideal for small, non-production
     - Dedicated Cluster: For larger-scale or production use.
     - Serverless Instance: Pay-as-you-go based on operations and storage.

4. Configure the Cluster

   - Select your cloud provider (AWS, Google Cloud, or Azure) and region (based on your application's geographical needs).
   - For shared clusters, the configuration options are limited, but for dedicated clusters, you can select the number of nodes, storage size, and cluster tier.

5. Cluster Tier and Pricing

   - For a free tier, the default tier (M0) is preselected.
   - For paid clusters, choose an instance size (e.g., M10, M20) based on your expected workload.

6. Additional Settings

   - Enable optional features such as backup or encryption (for paid tiers).
   - Configure tags to organize and monitor resources.

7. Create the Cluster

   - Click Create Cluster.
   - It may take a few minutes for the cluster to be provisioned.

8. Secure Your Cluster

   - Set up network access by allowing your IP address or configuring a virtual private network (VPN).
   - Add a database user with a username and password for authentication.

9. Connect to the Cluster

   - Once the cluster is created, you can connect to it using a connection string provided by Atlas.
   - You can connect via MongoDB Compass, the MongoDB shell (mongosh), or your application code using a MongoDB driver.

### What is the "Add entries to your ip address list", and what will adding 0.0.0.0/0 do ?

The "Add entries to your IP address list" option in MongoDB Atlas is part of the **network access configuration**. It determines which IP addresses or ranges can connect to your database cluster. This is a critical security setting that ensures only authorized devices can access your database.

#### What It Does

#### 1. Allowlisting an IP Address or Range

When you add an IP address or CIDR block (e.g., `192.168.1.1/32`), Atlas permits connections from those specified addresses.

**Examples:**

- `192.168.1.1/32`: Allows a single IP address.
- `192.168.1.0/24`: Allows all addresses from `192.168.1.0` to `192.168.1.255`.

### Purpose

- **Restricts access** to trusted devices and networks.
- **Enhances security** by preventing unauthorized connections.

### What Adding `0.0.0.0/0` Does

Adding `0.0.0.0/0` to the IP address list allows all IP addresses to connect to your cluster. This essentially opens your database to the entire internet.

### Risks of Using `0.0.0.0/0`

1. **Security Vulnerabilities**

   - Anyone on the internet could attempt to access your database.
   - Increases the risk of unauthorized access, data breaches, and attacks.

2. **Compliance Issues**

   - May violate data protection and privacy laws, especially if sensitive data is stored.

3. **Malicious Activities**
   - Hackers and bots often scan for open databases to exploit.

---

### When (If Ever) Should You Use `0.0.0.0/0`?

- **Temporary Use Only:**  
  Use during the early stages of development or testing when quick access from multiple devices or networks is needed.

- **With Authentication Enabled:**  
  Ensure strong usernames and passwords or other authentication mechanisms (e.g., certificates) are in place.

- **With Additional Protections:**
  - Combine `0.0.0.0/0` with a VPN or VPC peering to restrict access further.
  - Enable **TLS/SSL encryption** to secure connections.

### Best Practices

1. **Restrict Access:**

   - Only add trusted IP addresses or ranges.
   - Use dynamic IPs sparingly and update the allowlist regularly if necessary.

2. **Monitor Connections:**

   - Use MongoDB Atlas's monitoring tools to track access attempts.

3. **Enable Authentication:**

   - Always require authentication using robust credentials.

4. **Remove `0.0.0.0/0` as Soon as Possible:**
   - Replace it with a specific IP address or CIDR block once you know the source of the connection.

By following these practices, you can effectively secure your MongoDB Atlas cluster and reduce potential risks.

## 12. Edited the `.env` and `constants.js` file

A `constants` file is used to store static, non-sensitive values like pagination size or UI settings, and it's typically part of the codebase.

In contrast, a `.env` file stores sensitive or environment-specific data, such as API keys or database credentials, in key-value pairs. `.env` files are excluded from version control for security, while `constants` files are included and used for values that remain the same across environments.

**`.env.sample` file at this point**

```
PORT=8000
MONGODB_URL=mongodb+srv://<your-username>:<your-password>@cluster0.vqanq.mongodb.net
```

## 13. Establishing database connection

### Method 1

**`index.js` file**

```js
import mongoose from "mongoose";
import { DB_NAME } from "./constants";

// Method 1 to establish database connection following good practices
// i.e using a iife

import express from "express";
const app = express();

(async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    // eg. mongodb://127.0.0.1:27017/db_name

    app.on("error", (error) => {
      console.log(`ERROR: ${error}`);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`console is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
})();
```

### Method 2

`db.js` file

```js
import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const db_connection = async () => {
  try {
    const connection_instance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`DB HOST ${connection_instance.connection.host}`);
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

export default db_connection;
```

`index.js` file

```js
import dotenv from "dotenv";
import db_connection from "./db/db";

dotenv.config({
  path: "./env",
});

db_connection();
```

edited the script in `package.json` file

```
"scripts": {
    "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js",
  }
```

**Method 1 (IIFE in `index.js`)** : Combines the database connection and server setup in a single file using an Immediately Invoked Function Expression (IIFE). This approach is straightforward and good for small projects but lacks modularity, making it harder to scale or test.

**Method 2 (`db.js` and `index.js`)** : Separates database connection logic into a dedicated file (`db.js`) and imports it into `index.js`. This modular structure improves code reusability, testing, and scalability, making it more suitable for larger projects or production environments

The updated script in `package.json` uses `nodemon` for automatic server restarts on file changes, `-r dotenv/config` to preload environment variables from a `.env` file, and `--experimental-json-modules` to enable modern ES module syntax (`import/export`). These changes streamline development by simplifying environment setup, supporting modern JavaScript practices, and enhancing productivity.

### An Error and its Solution

When I ran the command `npm run dev`, I encountered the following error:

```
Error: querySrv ENOTFOUND _mongodb._tcp.vin
```

**Cause of the Error :**

This error occurred because my MongoDB connection string in the `.env` file contained a password with special characters such as @, /, etc. These characters need to be `URL-encoded` in the connection string to ensure proper parsing and avoid misinterpretation.

**Solution:**

I resolved the issue by URL-encoding my password. The encoding process converts special characters into a format that can be safely included in a URL.

**Here’s how I did it :**

- **Identify the Special Characters in the Password** : Lets say my password was `p@ssword`.

- **Encode the Password** : Using a URL encoder, I converted `@` into its encoded equivalent `%40`. The encoded password became `p%40ssword` .

- **Update the Connection String** : I updated the `.env` file to include the encoded password:

```
MONGODB_URL=mongodb+srv://<name>:p%40ssword@cluster0.vqanq.mongodb.net
```

- **Test the Connection** : After saving the changes, I ran the command `npm run dev` again, and the issue was resolved. The connection to the MongoDB database was successfully established.

## 14. Updated `app.js` and `index.js`

`app.js`

```js
import express from "express";

const app = express();

export { app };
```

`index.js`

```js
import dotenv from "dotenv";
import db_connection from "./db/db.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

db_connection()
  .then(() => {
    app.on("error", (error) => {
      console.log(`ERROR: ${error}`);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`process is running at : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MONGO DB CONNECTION ERROR : ", error);
  });
```

## 15. Installed `cors` and `cookie-parser` packages, added `CORS_ORIGIN` in the `.env` file, and updated the `app.js` file.

`app.js`

```js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

export { app };
```

### `cors` : Middleware to enable Cross-Origin Resource Sharing, allowing resources to be accessed by other domains.

### `cookie-parser` : Middleware to parse cookies from the Cookie header in incoming requests.

1. **CORS** : Configures cross-origin access. `CORS_ORIGIN=*` allows any domain to access the server, suitable for development but **insecure** for production.
2. **express.json** & **express.urlencoded** : Parse JSON and URL-encoded data in request bodies, with a size limit of 16 KB.
3. **express.static** : Serves static files from the `public` directory.
4. **cookie-parser** : Parses cookies into `req.cookies`.

`CORS` package : Handles cross-origin requests.

`Cookie-parser` package : Extracts cookies from requests.

In production, replace `CORS_ORIGIN=*` with a specific domain for security.

## 16. Made a utility in the utils folder named `asyncHandler.js`

`asyncHandler.js`

```js
// Method 1

const asyncHandler = (func) => async (req, res, next) => {
  try {
    await func(req, res, next); // Executes the passed function
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};
```

```js
// Method 2

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    return Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};
```

All questions I had are answered in the `asyncHandler.md` file

**Questions**

1. What the code does (Explanation of `asyncHandler`).
2. Middleware in Express and their role.
3. Higher-order functions in JavaScript.
4. Comparison of two versions of `asyncHandler` (Method 1 and Method 2).
5. How error handling works in Express.
6. Explanation of Promise and `Promise.resolve` .
7. The roles of req, res, and next in Express.
8. Simplified syntax options for `asyncHandler`.
9. The parameter relationships of `asyncHandler` and `requestHandler`.
10. How Express recognizes `req`, `res`, and `next` without an explicit import.
11. A practical example of using `asyncHandler`.

## 17. Made another utility `ApiError.js`

```js
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
```

All doubts I had are answered in the `asyncHandler.md` file

## 18. Made another utility `ApiResponse.js`

```js
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
```

## 19. Made and worked on `user.model.js` and `video.model.js` in the `models` folder

**more work is to be done in these files**

`user.model.js`

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
// A refresh token is a long-lived credential used in conjunction with an access token to maintain user
// authentication without requiring them to log in again.

// It is part of the token-based authentication strategy to improve security and enhance the user experience.

export const User = mongoose.model("User", userSchema);
```

`video.model.js`

```js
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    video_file: {
      type: String, // cloudinary url
      required: true,
    },
    thumbnail: {
      type: String, // cloudinary url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
```

### Why Use `mongooseAggregatePaginate`?

`mongooseAggregatePaginate` is a plugin that makes it easier to add pagination to aggregation pipelines.

Without it, you’d need to manually calculate the starting document (offset) for each page and limit the results, which can be error-prone.

With the plugin, pagination becomes simpler, as it automatically:

1. Splits the results into pages.
2. Calculates metadata like total pages, current page, and total documents.
3. Returns the paginated results.

### What is Pagination?

Pagination is the process of dividing a large dataset into smaller chunks (or "pages") that can be retrieved and displayed one at a time.

It’s commonly used in applications to display a subset of results at a time (e.g., 10 items per page) rather than loading all results at once, which can overwhelm both the server and the user interface.

- Example: When browsing a video library, you may see videos split into pages like:
  - Page 1: Videos 1–10
  - Page 2: Videos 11–20
  - ...and so on.

### What is Aggregation?

Aggregation in MongoDB is a process of transforming and analyzing data using a series of stages. Each stage applies a specific operation to the data (e.g., filtering, grouping, sorting), and the output of one stage becomes the input for the next.

- Example:
  - You might want to filter all published videos, group them by category, and then sort them by views.

### What are Mongoose Aggregation Pipelines?

In Mongoose, aggregation pipelines are a way to perform advanced queries on MongoDB collections. The pipeline consists of multiple stages, where each stage performs an operation like filtering, projecting, or sorting.

- Key Stages:
  1. `$match`: Filters documents based on conditions (e.g., only include published videos).
  2. `$group`: Groups documents by a field (e.g., count videos by category).
  3. `$sort`: Orders documents (e.g., sort by views in descending order).
  4. `$project`: Selects specific fields (e.g., only return titles and views).

Go to **Real_Project/zNotes/user.model.js.md** for more in-depth notes

## 20. Installed `cloudinary` and `multer`

checkout `fileupload` package too

## 21. Made the `cloudinary.js` file in the `utils` folder

```js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // uploading file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      // "localFilePath" is a variable expected
      resource_type: "auto",
    });

    console.log(`file is uploaded to cloudinary ${response.url}`);
    return response;
  } catch (error) {
    // Attempt to remove the temporary file
    try {
      fs.unlinkSync(localFilePath); // to remove the locally saved temporary file as the upload got failed
      console.log(
        `Temporary file ${localFilePath} removed after upload failure.`
      );
    } catch (unlinkError) {
      console.error(
        `Failed to remove temporary file ${localFilePath}:`,
        unlinkError.message
      );
    }

    return null;
  }
};

export { uploadOnCloudinary };
```

**`fs` Module** :
The `fs` (File System) module in `Node.js` is used to interact with the file system.

It allows you to:

- Read, write, delete, and modify files.
- Work with directories.
- Check file/directory stats.
- It offers both `asynchronous` (non-blocking) and `synchronous` (blocking) methods.

`fs.unlinkSync` :

- **Purpose** : Deletes a file synchronously (blocking operation).
- **Syntax** : `fs.unlinkSync(path)`
- **path** : The path of the file to delete.
- **Usage** : Ensures the file is deleted before moving to the next operation.
- **Error Handling** : Throws an error if the file doesn't exist or permissions are insufficient

- **When to Use unlinkSync** :
  - When you need to ensure the file is deleted before moving on to the next operation.
  - When writing simple scripts where performance or blocking behavior isn't a concern.
- **When to Avoid unlinkSync** :
  - In a server environment where non-blocking asynchronous operations are preferred for better performance and scalability.
  - When handling large numbers of file operations to avoid freezing the application during synchronous tasks.

## 22. Made `multer.middleware.js` in the middleware directory

```js
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// `cb` stands for "callback."
// It is a function provided by Multer that you call to pass the result back to Multer after performing your logic.
// It is used to define the behavior for destination and filename functions.
// `cb` ensures that Multer waits for the callback before proceeding

export const upload = multer({
  storage,
});
```

**Most of the setup work is done with this**

**Learn about status codes**

## 23. Made `user.controller.js` and `user.routes.js`

`user.controller.js`

```js
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "OK",
  });
});

export { registerUser };
```

`user.routes.js`

```js
import { Router } from "express";

const router = Router();

export default router;

// Single Default Export:
//     - This code uses export default to export the router object.
//     - The ***imported name*** (router) ***can be anything***, as the default export does not require the name to match.
//     - A module can only have one default export.
```

## 24. Worked on `app.js`, `user.routes.js`, `user.controller.js`

`app.js`

```js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/user", userRouter);

// http://localhost:8000/api/v1/users/register

export { app };
```

`user.routes.js`

```js
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();
router.route("/register").post(registerUser);

export default router;

// Single Default Export:
//     - This code uses export default to export the router object.
//     - The ***imported name*** (router) ***can be anything***, as the default export does not require the name to match.
//     - A module can only have one default export.
```

`user.controller.js`

```js
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "OK",
  });
});

export { registerUser };
```

### Request and Function Call Flow

1. **Request Entry (`app.js`)**

   - The client sends a request to `http://localhost:8000/api/v1/user/register`.
   - `app.js` routes the request to `userRouter` based on `/api/v1/user`.

2. **Route Matching (`user.routes.js`)**

   - The `userRouter` matches the `/register` route.
   - It maps the POST request to the `registerUser` function in `user.controller.js`.

3. **Controller Logic (`user.controller.js`)**

   - `registerUser` is executed, wrapped in `asyncHandler` for error handling.
   - The function processes the request and sends a JSON response, e.g.
     ```json
     { "message": "OK" }
     ```

4. **Response Sent**
   - The response is sent back to the client, completing the flow.

- **File-to-File Flow:**
  `app.js` → `user.routes.js` → `user.controller.js` → Client Response

Tested if response is getting returned properly using postman

## 25. Worked on `user.routes.js` and `user.controller.js`

`user.routes.js`

```js
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

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

export default router

// Single Default Export:
//     - This code uses export default to export the router object.
//     - The ***imported name*** (router) ***can be anything***, as the default export does not require the name to match.
//     - A module can only have one default export.
```

`user.controller.js`

```js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
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

  const { fullName, email, username, password } = req.body;
  console.log(`email : ${email}`);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All feilds are required");
  }

  // The `.some()` method in JavaScript is an array method that tests whether at least one element in the array
  // passes the condition defined in a provided callback function.
  // It returns true as soon as any one element satisfies the condition.

  const userExists = User.findOne({
    $or: [{ username }, { email }],
  });

  // `$or` is used to implement the "or" operation.
  // Here we are checking if "username" or "email" already exists. And the above is the syntax used

  if (userExists) {
    throw new ApiError(409, "user with this email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    avatar: avatar.url,
    coverImage: coverImage?.url,
  });

  const userCreated = User.findById(user._id).select("-password -refreshToken");
  // `.select()` selects everything by default so to remove password and refreshToken this can be done.
  // `-` means to remove

  if (!userCreated) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, userCreated, " user registered successfully "));
});

export { registerUser };
```

### **Explanation this piece of Code**

```javascript
const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;
```

---

### **Purpose**

These lines safely retrieve the file paths of uploaded files for the `avatar` and `coverImage` fields from the `req.files` object, which is populated by the `multer` middleware during a `multipart/form-data` request.

### **How It Works**

1. **`req.files`:**

   - Created by `multer`, it stores uploaded files organized by field names (e.g., `avatar`, `coverImage`).
   - When using `upload.fields()`, each field in `req.files` is an array of file objects (even if only one file is uploaded).

2. **`req.files?.avatar` and `req.files?.coverImage`:**

   - Optional chaining (`?.`) ensures no error is thrown if `req.files` or the specific field (`avatar` or `coverImage`) is `undefined`.
   - If a field is absent (no file uploaded), the result is `undefined`.

3. **`req.files?.avatar[0]` and `req.files?.coverImage[0]`:**

   - Access the first file object in the array for `avatar` or `coverImage`.
   - The `avatar[0]` or `coverImage[0]` is the object containing metadata about the file (e.g., `path`, `size`, `filename`, etc.).

4. **`req.files?.avatar[0]?.path` and `req.files?.coverImage[0]?.path`:**
   - Access the `path` property of the first file object.
   - The `path` contains the server's full file path for the uploaded file (e.g., `"uploads/avatar-12345.png"`).

### **Example Scenarios**

#### 1. **File Successfully Uploaded:**

If a file is uploaded for `avatar`:

```javascript
req.files = {
  avatar: [
    {
      path: "uploads/avatar-12345.png",
      /* other metadata */
    },
  ],
  coverImage: [
    {
      path: "uploads/coverImage-67890.jpg",
      /* other metadata */
    },
  ],
};

const avatarLocalPath = req.files?.avatar[0]?.path; // 'uploads/avatar-12345.png'
const coverImageLocalPath = req.files?.coverImage[0]?.path; // 'uploads/coverImage-67890.jpg'
```

#### 2. **No File Uploaded:**

If no file is uploaded for `avatar` or `coverImage`:

```javascript
req.files = undefined;

const avatarLocalPath = req.files?.avatar[0]?.path; // undefined
const coverImageLocalPath = req.files?.coverImage[0]?.path; // undefined
```

### **Why Optional Chaining (`?.`) Is Used**

- Prevents runtime errors when:
  - `req.files` is `undefined` (no files uploaded).
  - `req.files.avatar` or `req.files.coverImage` is `undefined` (specific field missing).
  - The array is empty (`avatar[0]` or `coverImage[0]` is `undefined`).

### **Key Notes**

1. **Efficient and Safe:**

   - Ensures your app won't crash if files aren't uploaded.
   - Returns `undefined` if no file exists, making it easy to check later.

2. **Use Cases:**
   - Validating whether a file was uploaded:
     ```javascript
     if (!avatarLocalPath) {
       throw new Error("Avatar file is required");
     }
     ```
   - Processing file paths for saving to a database or using elsewhere in the server logic.

### **Summary**

- `avatarLocalPath` and `coverImageLocalPath` retrieve the file paths of uploaded files using optional chaining and array indexing.
- They are `undefined` if no file is uploaded or the fields are missing.
- This approach is both **safe** and **efficient** for handling optional file uploads.
