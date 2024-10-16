import ItemModel from "../admin/itemSchema.js";
import itemRought from "./itemRought.js";
// initial=0,skip=0
const fetch10Item = async (value) => {
  try {
    const response = await ItemModel.find({}).skip(value).limit(10);
    return response;
  } catch (err) {
    throw err;
  }
};
const getAllCategory = async () => {
  try {
    const allCategories = [];
    const response = await ItemModel.find({}, { categories: 1, _id: 0 });
    response.forEach((item) => {
      if (item.categories && !allCategories.includes(item.categories)) {
        allCategories.push(item.categories);
      }
    });

    return allCategories;
  } catch (err) {
    throw err;
  }
};

const getByCategories = async (type) => {
  try {
    const result = await ItemModel.find({ categories: type });
    result;
    return result;
  } catch (err) {
    throw err;
  }
};

const fetchAll = async () => {
  try {
    const result = await ItemModel.find();
    return result;
  } catch (err) {
    throw err;
  }
};
const deleteItem = async (_id) => {
  try {
      const result = await ItemModel.findByIdAndDelete(_id);
      if (result) {
          return { success: true }; 
      } else {
          return { success: false, message: 'Item not found.' };
      }
  } catch (err) {
      throw err;
  }
};


const updateItem = async(_id, title, categories, price, description)=>{
  try{
    const result = await ItemModel.findByIdAndUpdate({_id},{ title, categories, price, description});
    if(result){
      return result
    }return null;
  }catch(err){
    throw err;
  }
}

export { fetch10Item, getAllCategory, getByCategories, fetchAll, deleteItem, updateItem };
