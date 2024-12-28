import mongoose, { Schema } from "mongoose"

const patientSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    diagnosedWith: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    admittedIn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    },
    photo: {
        type: String,
    }

}, { timestamps: true })

export const Patient = mongoose.model("Patient", patientSchema)