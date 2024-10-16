import express from "express";
import { addNewItem } from "./adminController.js";
import { uploadFile } from "../middleware/imageHandler.js";

const adminRought = express.Router();
adminRought.post('/addItem',uploadFile.single('image'), addNewItem);


export default adminRought