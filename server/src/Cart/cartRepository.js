import mongoose from "mongoose";
import CartModel from "./cartSchema.js";


const checkItemPresent =async (item_id,user_id)=>{
try{
    const result = await CartModel.findOne({
        'items.item_id':item_id ,
        user:user_id
    });
    return result;
}
catch(err){
throw err;
}
}

const deleteCart = async(userId)=>{
    try{
        const result = await CartModel.deleteMany({ user: userId });
        if(result.deletedCount>0){
            return true;
        }return false;
    }catch(err){
        throw err
    }
}

const add =async (_id, title, price,image , user_id)=>{
    try{
        const newItem = new CartModel({
            items:[
                {
                    item_id:_id,
                    item_title:title,
                    item_image:image,
                    item_price: price,
                    
                }
            ],
            user:user_id,
        });
        const saveItem =await newItem.save();
        return saveItem;
    }catch(err){
        throw err;
    }
}


const getItems = async (userId) => {
    try {
        const cart = await CartModel.find(
            { user: new mongoose.Types.ObjectId(userId) },
             { 'items.item_id': 1, 'items.item_quantity': 1, 'items.item_price': 1, 'items.item_image':1,'items.item_title':1,_id: 0 }
        );
        if (!cart) {
            ('No cart found for this user.');
            return [];
        }
        ('Cart items are:', cart);
        return cart;
    } catch (err) {
        console.error('Error fetching cart items:', err);
    }
};


const updateCartQ = async (id, quantity, operation, userId) => {
    try {
        if (operation === '+' && quantity >= 0) { 
            const response = await CartModel.findOneAndUpdate(
                { 'items.item_id': id, user: userId },
                { $set: { 'items.$.item_quantity': quantity + 1 } },
                { new: true } 
            );
            return response;
        } else if (operation === '-' && quantity > 1) {
            const response = await CartModel.findOneAndUpdate(
                { 'items.item_id': id, user: userId },
                { $set: { 'items.$.item_quantity': quantity - 1 } }, 
                { new: true } 
            );
            return response;
        } else if (operation === '-' && quantity <= 1) {
            // This case removes the item from the cart if the quantity is 1 and the operation is '-'.
            const response = await CartModel.findOneAndDelete(
                { user: userId,'items.item_id':id  },
                { new: true } 
            );
            return response;
        }
    } catch (err) {
        console.error('Error updating cart quantity:', err);
        throw err; 
    }
};


export {add, checkItemPresent, getItems, updateCartQ, deleteCart};