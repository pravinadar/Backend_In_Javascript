# Resolving `Cannot use import statement outside a module` Error in Node.js  

When attempting to run Node.js code using ES Modules syntax (e.g., `import` statements) with the command:  
```bash
npm run start
```
you might encounter the following error:

```
import express from 'express'
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at internalCompileFunction (node:internal/vm:77:18)
    at wrapSafe (node:internal/modules/cjs/loader:1288:20)
    at Module._compile (node:internal/modules/cjs/loader:1340:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Module._load (node:internal/modules/cjs/loader:1023:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:135:12)
    at node:internal/main/run_main_module:28:49

Node.js v20.11.1
```
This error occurs because Node.js defaults to the CommonJS module system. To use ES Modules (import and export statements), you need to explicitly configure your project.

## Solution: Enable ES Modules

To resolve this issue, you must specify the JavaScript module type in your project's package.json file.

### Steps:

Open your project's package.json file.
Add or update the "type" field to specify "module".
Here’s how the updated package.json might look:

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  }
}
```

## Why This Works

Adding "type": "module" tells Node.js to interpret .js files as ES Modules by default.

Without this, Node.js assumes .js files use the CommonJS syntax, leading to the SyntaxError.

## Additional Notes:

If you only want to use ES Modules for specific files, you can rename them with the .mjs extension instead of updating the package.json.

Make sure you are using a Node.js version that supports ES Modules (v12.17.0 or later).

## Key Takeaway

The "type": "module" field in package.json is essential for enabling ES Modules in Node.js. This simple change allows you to use modern JavaScript syntax seamlessly in your Node.js applications.