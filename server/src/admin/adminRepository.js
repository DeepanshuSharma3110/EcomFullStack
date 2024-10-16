import ItemModel from "./itemSchema.js";
const add = async (title, description, categories, price, image) => {
  try {
    const item = new ItemModel({
      title,
      description,
      categories,
      price,
      image,
    });

    const savedItem = await item.save();

    return savedItem;
  } catch (err) {
    throw err;
  }
};

export { add };
