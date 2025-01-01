import dotenv from "dotenv"
import db_connection from "./db/db.js"

dotenv.config({
    path: './env'
})

db_connection();









// Method 1 to achieve a database connection using good practice
// i.e using a iife
/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";

import express from "express"
const app = express();


    (async () => {
        try {
            mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
            // eg. mongodb://127.0.0.1:27017/db_name

            app.on("error", (error) => {
                console.log(`ERROR: ${error}`)
                throw error;
            })

            app.listen(process.env.PORT, ()=>{
                console.log(`console is listening on port ${process.env.PORT}`)
            })
        } catch (error) {
            console.error("ERROR: ", error)
            throw error
        }

    })();
*/

