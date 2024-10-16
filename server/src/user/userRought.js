import express from "express";
import { registerUserByEmailPassword, LoginUserByEmailAndPassword, getUser, updateUser,getAll, LoginWithGoogle, updateUserWithOutImage, logout } from "./userController.js";
import jwtAuth from "../middleware/jwtAuth.js";
import { uploadFile } from "../middleware/imageHandler.js";

const userRoute = express.Router();

userRoute.post('/addUserWithEmail', registerUserByEmailPassword);
userRoute.post('/LoginUserWithEmail', LoginUserByEmailAndPassword);
userRoute.get('/getAll',getAll)
userRoute.get('/getUser', jwtAuth, getUser);
userRoute.post('/LoginWithGoogle',LoginWithGoogle)
userRoute.post('/updateUserWithOutImage', jwtAuth,updateUserWithOutImage);
userRoute.get('/logout',jwtAuth,logout)

userRoute.get('/verifyLogin', jwtAuth, (req, res) => {
console.log('welcome');

});

userRoute.post('/updateUser', jwtAuth, uploadFile.single('image'), updateUser);

export default userRoute;
