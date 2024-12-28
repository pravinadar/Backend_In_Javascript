import mongoose, { Schema } from "mongoose"

const medicalRecordSchema = new Schema({

}, { timestamps: true })

export const Medical_Record = mongoose.model("Medical_Record", medicalRecordSchema)