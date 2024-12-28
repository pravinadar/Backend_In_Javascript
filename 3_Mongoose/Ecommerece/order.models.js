import mongoose, { Schema } from "mongoose"

const orderItemSchema = new Schema({

    prtductId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity: {
        type: Number,
        required: true
    },
    

}, { timestamps: true })

const orderSchema = new Schema({

    orderPrice: {
        type: Number,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    orderItems: {
        type: [orderItemSchema],    // An array of 'orderItemSchema' to know which product is ordered how much
    },
    address:{
        type:String,
        required:true
    },
    orderStatus:{
        type:String,
        enum:["PENDING","CANCELLED","DELIVERED"],
        default:"PENDING"
    }

}, { timestamps: true })

export const Order = mongoose.model("Order", orderSchema)

// we are not exporting 'orderItemschema' because it is only being used here.
// we could have made 'orderItemSchema' in a different file, imported it and used it here 
// but we are not doing it since it's only use is here