// error = {statusCode:"", message:"",}
import { add } from "./adminRepository.js";
const addNewItem = async (req, res, next) => {
  try {
    const { title, description, categories, price } = req.body;
    const image = req.file;
    if (!title || !description || !categories || !price || !image) {
      error = { statusCode: 400, message: "all the fields are required" };
      return next(error);
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      image.filename
    }`;
    //need to use multer for storing the image file
    (title, description, categories, price, imageUrl);

    const result = await add(title, description, categories, price, imageUrl);

    if (!result) {
      error = {
        statusCode: 400,
        message: "unable to add the item please try again",
      };
      return next(error);
    }
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export { addNewItem };
