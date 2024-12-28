import mongoose, { Schema } from "mongoose"

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    qualifications: {
        type: String,
        required: true,
    },
    experienceInYears: {
        type: String,
        required: true,
    },
    worksInHospitals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital"
        },
    ],


}, { timestamps: true })

export const Doctor = mongoose.model("Doctor", doctorSchema)