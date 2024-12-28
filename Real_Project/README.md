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