# API Error Handler Documentation

## Overview
The `ApiError` class is a custom error handling solution designed to standardize error responses across an API. It extends JavaScript's built-in `Error` class to provide consistent error formatting and additional functionality specific to API responses.

## Class Structure
```javascript
class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors
        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
```

## Properties
- `statusCode`: HTTP status code for the error (e.g., 400, 404, 500)
- `message`: Human-readable error message
- `errors`: Array of additional error details
- `data`: Null by default, can be used to pass additional data
- `success`: Boolean flag, always false for errors
- `stack`: Error stack trace for debugging


## Node.js Error API Integration

This section explains how the ApiError class integrates with Node.js's built-in error handling system.

### Core Components

#### 1. Extending Built-in Error
```javascript
class ApiError extends Error
```
- Inherits from Node's built-in `Error` class
- Gets access to basic error properties and methods
- Allows the error to be recognized by Node's error handling system

#### 2. Super Call
```javascript
super(message)
```
- Calls the parent Error class constructor
- Sets up the initial error message
- Initializes internal Error properties

#### 3. Custom Properties
```javascript
this.statusCode = statusCode
this.data = null
this.message = message
this.success = false
this.errors = errors
```
- These are custom properties added to enhance the error information
- Not part of Node's standard Error object
- Useful for API responses and error handling middleware

#### 4. Stack Trace Handling
```javascript
if (stack) {
    this.stack = stack
} else {
    Error.captureStackTrace(this, this.constructor)
}
```
- Uses Node's V8 engine `Error.captureStackTrace()` method
- Either preserves an existing stack trace or creates a new one
- Useful for error chaining and debugging

### Practical Implementation Example

```javascript
// Example usage in an Express route
app.get('/users/:id', async (req, res, next) => {
    try {
        const user = await findUser(req.params.id);
        if (!user) {
            // Create new error
            throw new ApiError(404, "User not found");
        }
        res.json(user);
    } catch (dbError) {
        // Chain errors while preserving stack
        throw new ApiError(
            500,
            "Database error occurred",
            [{ detail: dbError.message }],
            dbError.stack
        );
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        // Custom error handling
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors
        });
    }

    // Default error handling
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});
```

### Node.js Error Handling Integration Benefits

When an error occurs, Node.js will:
1. Create the error instance with proper inheritance
2. Set up the error message through the Error class
3. Generate or preserve the stack trace
4. Allow the error to be caught and handled by error middleware
5. Maintain the error details throughout the error handling chain

This integration with Node's error system allows for:
- Proper error inheritance checking (`instanceof`)
- Stack trace generation and preservation
- Integration with Node's uncaught exception handlers
- Compatibility with Express/other framework error handlers
- Clean error handling in async/await code


## Understanding Stack Traces and Error.captureStackTrace()

### What is a Stack Trace?
A stack trace is essentially a "breadcrumb trail" of what your code was doing when an error occurred. It shows the sequence of function calls that led to the error, helping you debug by revealing:
- Where exactly the error occurred (file, line number)
- The path your code took to get there (function call hierarchy)
- The state of the call stack at the time of the error

Example of a stack trace:
```javascript
function c() {
    throw new Error('Something broke!');
}

function b() {
    c();
}

function a() {
    b();
}

try {
    a();
} catch(error) {
    console.log(error.stack);
}

// Stack trace output might look like:
// Error: Something broke!
//     at c (file.js:2:11)
//     at b (file.js:6:5)
//     at a (file.js:10:5)
//     at Object.<anonymous> (file.js:14:5)
```

### Error.captureStackTrace()
`Error.captureStackTrace(targetObject, constructorOpt)` is a V8 engine method that creates a `.stack` property on an object, capturing the current stack trace. It has two parameters:

1. `targetObject`: The object to add the stack trace to
2. `constructorOpt`: Optional - a function to stop the stack trace at (stack frames above this function will be hidden)

In the ApiError class:
```javascript
if (stack) {
    this.stack = stack;
} else {
    Error.captureStackTrace(this, this.constructor);
}
```

This code does two things:
1. If a stack is provided, use it directly (useful when wrapping another error)
2. Otherwise, create a new stack trace but stop at the ApiError constructor

### Benefits of Using captureStackTrace

#### Cleaner Stack Traces
```javascript
// Without captureStackTrace
try {
    throw new ApiError(500, "Server Error");
} catch(error) {
    console.log(error.stack);
}
// Output includes internal Error creation details:
// Error: Server Error
//     at new ApiError (apiError.js:3:28)  <- includes internal constructor
//     at Object.<anonymous> (test.js:2:11)

// With captureStackTrace
try {
    throw new ApiError(500, "Server Error");
} catch(error) {
    console.log(error.stack);
}
// Output is cleaner:
// ApiError: Server Error
//     at Object.<anonymous> (test.js:2:11)  <- starts from where error was thrown
```

Main benefits:
1. Cleaner stack traces (removes internal implementation details)
2. Custom formatting of error stacks
3. Better debugging experience
4. Proper error inheritance chain

### Practical Example
```javascript
async function findUser(id) {
    try {
        const user = await db.users.findById(id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return user;
    } catch (dbError) {
        // Preserve original stack but wrap in ApiError
        throw new ApiError(
            500,
            "Database error",
            [{ detail: dbError.message }],
            dbError.stack  // Preserves the original stack trace
        );
    }
}
```

## Usage Examples

### Basic Error Handling
```javascript
// In your route handler
app.get('/users/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
});

// In your error middleware
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message
    });
});
```

### Validation Error Example
```javascript
// In your validation middleware
const validateUser = (req, res, next) => {
    const errors = [];
    
    if (!req.body.email) {
        errors.push({ field: 'email', message: 'Email is required' });
    }
    if (!req.body.password) {
        errors.push({ field: 'password', message: 'Password is required' });
    }
    
    if (errors.length > 0) {
        throw new ApiError(400, "Validation failed", errors);
    }
    
    next();
};
```

### Database Error Example
```javascript
async function createUser(userData) {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        // Preserve the original stack trace while creating a custom error
        throw new ApiError(
            500,
            "Database operation failed",
            [{ detail: error.message }],
            error.stack
        );
    }
}
```

## Benefits
1. **Consistency**: Standardized error format across your API
2. **Debugging**: Proper stack trace handling for better error tracking
3. **Flexibility**: Support for multiple error messages and custom status codes
4. **Clean Code**: Reduces repetitive error handling code
5. **Type Safety**: When using TypeScript, provides proper type information

## Best Practices
1. Always include appropriate HTTP status codes
2. Use descriptive error messages
3. Include relevant error details in the errors array
4. Preserve stack traces when wrapping other errors
5. Handle errors at the appropriate level in your application