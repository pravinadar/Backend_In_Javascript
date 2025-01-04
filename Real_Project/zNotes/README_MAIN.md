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

**What is Nodemon?**

- `nodemon` is a utility tool for Node.js that automatically restarts your server when it detects file changes.
- It’s particularly useful during development.

**Why use Nodemon?**

- You don’t need to manually stop and restart the server every time you make a change.
- It speeds up your development process by reloading your application whenever a file changes.

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

- **Avoid Formatting Disputes** : Eliminates arguments over code style in pull requests.
- **Save Time** : Automates tedious formatting tasks.
- **Readability** : Makes the code clean and easier to read.
- **Toolchain Integration** : Works well with linters like ESLint, CI/CD pipelines, and version control.

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
    return Promise.resolve(requestHandler(req, res, next))
      .catch((error) => next(error));
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
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export { ApiError }
```
All doubts I had are answered in the `asyncHandler.md` file

## 18. Made another utility `ApiResponse.js`