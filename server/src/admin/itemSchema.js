import mongoose from "mongoose";

// Define the schema for the items (title, description, categories, price, image)
const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  
    },
    description: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,  
        required: true,
    }
});


const ItemModel = mongoose.model('Item', itemSchema);  
export default ItemModel;
