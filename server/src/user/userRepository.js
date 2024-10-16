import UserModel from "./userSchema.js";
import jwt from "jsonwebtoken";

const add = async (username, email, password) => {
  try {
    const result = new UserModel({
      username,
      email,
      password,
    });
    const newUser = await result.save();
    if (newUser) {
      return newUser;
    }
    return null;
  } catch (err) {
    throw err;
  }
};

const checkEmail = async (email) => {
  try {
    const result = UserModel.findOne({ email });
    if (result) {
      return result;
    }
    return null;
  } catch (err) {
    next(err);
  }
};

const token = (verifyEmail) => {
  return jwt.sign(
    {
      userId: verifyEmail._id,
      email: verifyEmail.email,
      username: verifyEmail.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

const tokenForGoogle = (newUser) => {
  return jwt.sign(
    {
      userId: newUser._id,
      email: newUser.email,
      username: newUser.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};
const fetchUser = async (userId) => {
  try {
    const result = await UserModel.findById(
      { _id: userId },
      {
        username: 1,
        email: 1,
        phoneNumber: 1,
        address1: 1,
        image: 1,
        _id: 1,
        address2: 1,
        pincode: 1,
        state: 1,
      }
    );
    if (result) {
      return result;
    }
    return null;
  } catch (err) {
    throw err;
  }
};

const updateUserDetails = (
  _id,
  phoneNumber,
  address1,
  address2,
  state,
  pincode,
  imageUrl
) => {
  try {
    const result = UserModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          phoneNumber,
          address1,
          address2,
          state,
          pincode,
          image: imageUrl,
        },
      },
      { new: true, fields: { password: 0 } }
    );
    return result;
  } catch (err) {
    throw err;
  }
};




const updateWithoutImage = (
  _id,
  phoneNumber,
  address1,
  address2,
  state,
  pincode
) => {
  try {
    const result = UserModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          phoneNumber,
          address1,
          address2,
          state,
          pincode
        },
      },
      { new: true, fields: { password: 0 } }
    );
    return result;
  } catch (err) {
    throw err;
  }
};



const addTokenToDatabase = async (token, user) => {
  const { _id } = user;
  const updatedUser = await UserModel.findByIdAndUpdate(_id, { token: token });

  return updatedUser;
};

const fetchAll = async () => {
  try {
    const result = await UserModel.find(
      {},
      { username: 1, email: 1, state: 1, phoneNumber: 1, _id: 1 }
    );
    return result;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw new Error("Could not fetch users");
  }
};




const findUserByEmail = async (email) => {
  try {
    const result = await UserModel.findOne({ email });
    if (result) {
      return result;
    }
    return null;
  } catch (err) {
    throw err;
  }
};


const creatNewUserFromGoogle = async (email, image, username) => {
  try {
    const newUser = new UserModel({
      email,
      image,
      username,
    });
    const saveUser = await newUser.save();
    return saveUser;
  } catch (err) {
    throw err;
  }
};

export {
  add,
  checkEmail,
  token,
  addTokenToDatabase,
  fetchUser,
  updateUserDetails,
  fetchAll,
  tokenForGoogle,
  findUserByEmail,
  creatNewUserFromGoogle,updateWithoutImage
};
