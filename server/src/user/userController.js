import {
  add,
  addTokenToDatabase,
  checkEmail,
  token,
  fetchUser,
  updateUserDetails,
  fetchAll,
  findUserByEmail,
  creatNewUserFromGoogle,tokenForGoogle,updateWithoutImage
} from "./userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// error = {statusCode:"", message:"",}
const registerUserByEmailPassword = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //check if the email is already present
    const verifyEmail = await checkEmail(email);
    if (!verifyEmail) {
      //bcrypt the password before saving it
      const newPassword = await bcrypt.hash(
        password,
        Number(process.env.SALT_ROUND)
      );

      const result = await add(username, email, newPassword);
      if (result) {
        result;
        return res
          .status(201)
          .json({ message: "User created Sucessfully", result });
      } else {
        const error = {
          statusCode: 400,
          message: "unable to save user please try again",
        };
        return next(error);
      }
    } else {
      ("email matched");
      const error = { statusCode: 400, message: "Email ID Already Present" };
      return next(error);
    }
    // add user
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
      return res.status(404).json({ message: "No users found." });
    } catch (err) {
      console.error("Error fetching users:", err); 
      next(err);
    }
  };
  

const LoginUserByEmailAndPassword = async (req, res, next) => {
  try {
    //check if id already present
    const { email, password } = req.body;
    if (!email || !password) {
      const error = {
        statusCode: 400,
        message: "both the values are required",
      };
      return next(error);
    }
    //check the email id is valid or not
    const verifyEmail = await checkEmail(email);
    if (!verifyEmail) {
      const error = { statusCode: 400, message: "Email Id Not Found" };
      return next(error);
    } else {
      //bcrypt and compair the password
      const match = await bcrypt.compare(password, verifyEmail.password);
      if (!match) {
        const error = { statusCode: 400, message: "password doesnot match" };
        return next(error);
      } else {
        //if the password also match create a jwt token and return it to the user in cookies
        const tokenCreated = token(verifyEmail);

        //adding the token to the user database
        const result = await addTokenToDatabase(tokenCreated, verifyEmail);
        if (result) {
          const user = {
            username: verifyEmail.username,
            id: verifyEmail._id,
            email: verifyEmail.email,
            tokenCreated,
          };
          res.cookie("jwtKey", tokenCreated, { httpOnly: true });
          res.cookie("jwtKey2", tokenCreated, { httpOnly: false,sameSite: 'Lax',secure:false });
          //  res.user(user)
          return res.status(200).json({ user });
        } else {
          const error = {
            statusCode: 400,
            message: "unable to login please try again",
          };
          return next(error);
        }
      }
    }
  } catch (err) {
    return next(err);
  }
};
const getUser = async (req, res, next) => {
  try {
    if (!req.user) {
      const error = { statusCode: 400, message: "please login" };
      return next(error);
    }

    // (req.user);
    const result = await fetchUser(req.user.userId);
    result;
    if (result) {
      return res.status(200).json(result);
    } else {
      const error = { statusCode: 400, message: "please login" };
      return res.status(400), json({ message: "please login" });
    }
  } catch (err) {
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { phoneNumber, address1, address2, state, pincode } = req.body;
    const image = req.file;
    const _id = req.user.userId;

    if ((!phoneNumber, !address1, !address2, !state, !pincode, !image)) {
      error = { statusCode: 400, message: "all the fields are required" };
      return next(error);
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      image.filename
    }`;

    phoneNumber, address1, address2, state, pincode, imageUrl;
    const result = await updateUserDetails(
      _id,
      phoneNumber,
      address1,
      address2,
      state,
      pincode,
      imageUrl
    );
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





const LoginWithGoogle = async (req, res, next) => {
  try {
    const { email, image, username } = req.body;
    if (!email || !image || !username) {
      const error = {
        statusCode: 400,
        message: "Unable to add the item, please try again",
      };
      return next(error);
    }

    // Check if the user is already present
    const findUser = await findUserByEmail(email);

    let tokenCreated;
    let user;

    if (!findUser) {
      // If no user is present, create a new user
      const newUser = await creatNewUserFromGoogle(email, image, username);

      // Create a token for the new user
      tokenCreated = tokenForGoogle(newUser);
      user = {
        username: newUser.username,
        id: newUser._id,
        email: newUser.email,
        token: tokenCreated,
      };

      res.cookie("jwtKey", tokenCreated, { httpOnly: true });
      return res.status(201).json({ user });
    } else {
      // If user already exists, create a token for the existing user
      tokenCreated = tokenForGoogle(findUser);
      user = {
        username: findUser.username,
        id: findUser._id,
        email: findUser.email,
        token: tokenCreated,
      };

      res.cookie("jwtKey", tokenCreated, { httpOnly: true });
      return res.status(200).json({ user });
    }
  } catch (err) {
    return next(err);
  }
};

const updateUserWithOutImage = async (req, res, next) => {
  try {
    const { phoneNumber, address1, address2, state, pincode } = req.body;
    const _id = req.user.userId;

    // Check if all required fields are provided
    if (!phoneNumber || !address1 || !address2 || !state || !pincode) {
      const error = { statusCode: 400, message: "All fields are required" };
      return next(error);
    }

    // Call the updateWithoutImage function with the provided data
    const result = await updateWithoutImage(_id, phoneNumber, address1, address2, state, pincode);

    // Check if the update operation was successful
    if (!result) {
      const error = {
        statusCode: 400,
        message: "Unable to update the user, please try again",
      };
      return next(error);
    }

    // Return the updated user information
    return res.status(200).json(result); // Use 200 for successful updates
  } catch (err) {
    return next(err); // Pass any errors to the error handling middleware
  }
};

const logout = (req, res, next) => {
  try {
   
    res.clearCookie("jwtKey", {
      httpOnly: true, // Use the same attributes as when you set the cookie
      secure: true,   // If you set the cookie with 'secure', include it here as well
      sameSite: "None", // Adjust if needed based on how you set the cookie
      path: "/",       // Match the path used when setting the cookie
    });

    res.clearCookie("jwtKey2", {
      httpOnly: false, // Use the same attributes as when you set the cookie
      secure: false,   // If you set the cookie with 'secure', include it here as well
      sameSite: 'Lax', // Adjust if needed based on how you set the cookie
      path: "/",       // Match the path used when setting the cookie
    });


    // Optional: Send a response indicating the logout was successful
    res.status(200).json({ message: "Logout successful. Cookie cleared." });
  } catch (err) {
    console.error("Error clearing cookie:", err);
    res.status(500).json({ message: "An error occurred while logging out." });
  }
};



export {
  registerUserByEmailPassword,
  LoginUserByEmailAndPassword,
  getUser,
  updateUser,
  getAll,
  LoginWithGoogle,
  updateUserWithOutImage,
  logout
};
