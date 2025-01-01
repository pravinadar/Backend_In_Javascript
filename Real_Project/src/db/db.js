import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const db_connection = async () => {
    try {
        const connection_instance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`DB CONNECTED !! DB HOST ${connection_instance.connection.host}`)
    } catch (error) {
        console.error(`${error}`);
        process.exit(1)
    }
}

export default db_connection;