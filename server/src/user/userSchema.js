// username,email,password
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        minlength: 3, 
        maxlength: 30
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/, 
      },
      password: {
        type: String,
        minlength: 8 
      },
      token:{
        type:String,
      },
      phoneNumber:{
        type:Number,
      },
      image:{
        type:String
      },
      address1:{
       type:String, 
      },
      address2:{
        type:String, 
       },
       state:{
        type:String,
       },
       pincode:{
        type:String,
       },
    },
    { timestamps: true } 
  );
  


const UserModel = mongoose.model('User', userSchema);
export default UserModel;