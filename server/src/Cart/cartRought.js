import express from "express";
const cartRought = express.Router();
import jwtAuth from "../middleware/jwtAuth.js";
import { addItem,getAllCartItem,updateQuantity,clearCart } from "./cartController.js";


cartRought.post('/add',jwtAuth, addItem);

cartRought.get('/getAll',jwtAuth,getAllCartItem);
cartRought.post('/updatequantity',jwtAuth,updateQuantity);
cartRought.get('/clearCart',jwtAuth,clearCart);

export default cartRought;
