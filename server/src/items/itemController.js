import {
  fetch10Item,
  getAllCategory,
  getByCategories,
  fetchAll,
  deleteItem,updateItem
} from "./itemRepository.js";

const get10 = async (req, res, next) => {
  try {
    //const {skip} =req.body;
    const number = Math.floor(Math.random() * 20);
    const result = await fetch10Item(number);
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const result = await getAllCategory();
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};
const ByCategories = async (req, res, next) => {
  try {
    const { type } = req.params;
    "inseide server ", type;
    const result = await getByCategories(type);
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await fetchAll();
    if (result) {
      return res.status(200).json(result);
    }
    return res.status(400).json({ message: "no user found" });
  } catch (err) {
    return next(err);
  }
};

const DeleteProduct = async (req, res, next) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            const error = {statusCode:400, message: "Item ID is required."}
            return next(error);
        }
        const result = await deleteItem(_id);
        if (result.success) {
            return res.status(200).json({ message: "Item deleted successfully." });
        }
        return res.status(404).json({ message: result.message || "Failed to delete the item." });
    } catch (err) {
        return next(err); 
    }
};


const UpdateProduct =async (req,res,next)=>{
try{
    const {_id, title, categories, price, description} = req.body;
    if(!_id || !title || !categories || !price || !description){
        const error = {statusCode:400, message: "all the information is required"}
        return next(error);
    }
    const result = await updateItem(_id, title, categories, price, description);
    
    if(result) return res.status(200).json({ message: "Item deleted successfully." });
    return res.status(404).json({ message: result.message || "Failed to update the item." });
}catch(err){

}
}



export { get10, getCategories, ByCategories, getAll, DeleteProduct ,UpdateProduct};
