import mongoose, { Schema } from "mongoose"

const hospitalSchema = new Schema({
    

}, { timestamps: true })

export const Hospital = mongoose.model("Hospital", hospitalSchema)