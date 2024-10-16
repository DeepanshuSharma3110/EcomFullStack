import mongoose from "mongoose";


const CartSchema = new mongoose.Schema({
    items:[
    {
        item_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'item',
            required:true
        },
        item_quantity:{
            type:Number,
            default:1,
            min:1,
        },
        item_price:{
            type:Number,
            required:true,
        },
        item_image:{
            type:String,
            required:true,
        },
        item_title:{
            type:String,
            required:true,
        }
    }   
    ],
    user:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },    
}, { timestamps: true } 
)
const CartModel = mongoose.model('cart',CartSchema);
export default CartModel;