import React, { useState } from "react";
import style from "./Profile.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { updateUser, updateUserWithoutImage } from "../../redux/reducers/UserReducer";
import useNav from "../../hooks/useNavHook";

const ProfileDetails = ({ user }) => {
  const Navigate = useNav();  
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [image,setImage] = useState();
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber || '',
    address1: user.address1 || '',
    address2: user.address2 || '',
    state: user.state || '',
    pincode: user.pincode || '',
  });

  
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const validateData = () => {
    // Check phone number length
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      toast.error('Phone number should be exactly 10 digits.');
      return false;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }

    // Check pincode length
    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error('Pincode should be exactly 6 digits.');
      return false;
    }

    // Check if address fields are filled
    if (formData.address1.trim() === '' || formData.address2.trim() === '' || formData.state.trim() === '') {
      toast.error('Please fill in all address fields.');
      return false;
    }

    const statePattern = /^[a-zA-Z\s]+$/;
    if (!statePattern.test(formData.state)) {
      toast.error('State should only contain alphabetic characters and spaces.');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (validateData()) {
      setIsEditing(false);
      const data = new FormData();
      data.append('phoneNumber', formData.phoneNumber);
      data.append('address1', formData.address1);
      data.append('address2', formData.address2);
      data.append('state', formData.state);
      data.append('pincode', formData.pincode);
  
      // Check if an image has been uploaded; otherwise, do not append it
      if (image) {
        data.append('image', image);
      }
  
      // Dispatching a request for update based on whether an image is present
      const response = image 
        ? await dispatch(updateUser(data)) 
        : await dispatch(updateUserWithoutImage(formData));
  
      if (response.meta.requestStatus === "rejected") {
        toast.error('Something went wrong');
      } else if (response.meta.requestStatus === "fulfilled") {
        toast.success('Information Updated');
        Navigate('/user', 0);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        profilePic: imageUrl,
      }));
    }
  };

  return (
    <>
      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit Details</button>
      )}
      <div className={style.main}>
        <ToastContainer />
        <div className={style.container}>
          <div className={style.right}>
            <img
              src={
                formData.profilePic || user.image ||
                "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1728259200&semt=ais_hybrid"
              }
              alt="Profile"
              style={{ cursor: 'pointer' }}
              onClick={() => document.getElementById('profilePicInput').click()} 
            />
            <input
              type="file"
              id="profilePicInput"
              style={{ display: 'none' }}
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          <div className={style.left}>
            <span>
              <label>Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </span>

            <span>
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </span>

            <span>
              <label>Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </span>
          </div>
        </div>
        <div className={style.address}>
          <h3>Address</h3>
          <span>
            <label>Line 1</label>
            <input
              type="text"
              name="address1"
              placeholder="Enter your address line 1"
              value={formData.address1}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </span>
          <span>
            <label>Line 2</label>
            <input
              type="text"
              name="address2"
              placeholder="Enter your address line 2"
              value={formData.address2}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </span>
          <span>
            <label>State</label>
            <input
              type="text"
              name="state"
              placeholder="Enter your state"
              value={formData.state}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </span>

          <span>
            <label>Pincode</label>
            <input
              type="number"
              name="pincode"
              placeholder="Enter your pincode"
              value={formData.pincode}
              readOnly={!isEditing}
              onChange={handleChange}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
