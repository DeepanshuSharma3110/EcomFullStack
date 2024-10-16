import mongoose, { Types } from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
    },
    cart:[
        {
            items:[
                {
                    item_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Item',  
                    },
                    item_title: {
                        type: String,
                        required: true,
                    },
                    item_quantity: {
                        type: Number,
                        default: 1,
                    },
                    item_price: {
                        type: Number,
                        required: true,
                    },
                }
            ]
        }
    ],
    amount: {
        type: Number,
        required: true,
    },
    mode: {
        type: String,
        enum: ["COD", "PREPAID"],
        default: 'COD',
    },
    status:{
        type:String,
        enum:["PENDING","CONFIRM","TRANSIT","DELIVERED","REJECTED"],
        default:'PENDING'
    },
    responseId:{
        type:String,
    }
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);
