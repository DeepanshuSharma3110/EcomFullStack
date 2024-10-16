import express from "express";
import { get10, getCategories,ByCategories,getAll, DeleteProduct,UpdateProduct } from "./itemController.js";
const itemRought = express.Router();

itemRought.get('/get10',get10);
itemRought.get('/getCategories',getCategories);
itemRought.get('/getByCategories/:type',ByCategories);
itemRought.get('/getAll',getAll)
itemRought.post('/DeleteProduct',DeleteProduct);
itemRought.post('/UpdateProduct',UpdateProduct)

//itemRoute.get('/getByCategories/:type', );
export default itemRought;



