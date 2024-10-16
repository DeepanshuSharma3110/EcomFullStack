import React, { useState, useRef } from 'react';
import style from './Register.module.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../../redux/reducers/UserReducer';
import useNav from '../../hooks/useNavHook';

const Register = () => {
  
    const dispatch = useDispatch();
    const displayRef = useRef();
    const [data, setData] = useState({
        email: '',
        password: '',
        username:''
    });
    
    const navigateTo = useNav();
   

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const validation = () => {
        const { email, password,username } = data;

        if (!email || !password || !username) {
            toast.error('all the fields are required');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {  
            toast.error('Please enter a valid email address');
            return false;
        } else if (password.length < 8) {
            toast.error('Password should have at least 8 characters');
            return false;
        }

        return true;
    };

    const handleSubmit = async() => {
        const validationResponse = validation();
        if (validationResponse) {
            const response = await dispatch(RegisterUser(data));

            if(response.type==='RegisterUser/rejected'){
                toast.error(response.payload.message);

            }else{
                toast.success(response.payload.message)
                setData({
                    email: '',
                    password: '',
                    username:''
                });
                navigateTo('/login',1000)   
            }
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={style.main}>
            <div className={style.container}>
                <h2>Register</h2>
                <input 
                    placeholder='UserName' 
                    type='text' 
                    name='username' 
                    value={data.username} 
                    onChange={handleChange} 
                />

                <input 
                    placeholder='Email' 
                    type='text' 
                    name='email' 
                    value={data.email} 
                    onChange={handleChange} 
                />
                <input 
                    placeholder='Password' 
                    type={showPassword ? 'text' : 'password'} 
                    name='password' 
                    ref={displayRef} 
                    value={data.password} 
                    onChange={handleChange} 
                />
                <span>
                    <input 
                        type="checkbox" 
                        onClick={togglePasswordVisibility} 
                    />
                    <label>Show Password</label>
                </span>

                <button onClick={handleSubmit}>Register</button>
                <p>Already have an Account? <span><Link to='/Login'>Signin</Link> </span></p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
