import React, { useState, useRef } from 'react';
import style from './Login.module.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { LoginUserWithEmailPassword } from '../../redux/reducers/UserReducer';
import useNav from '../../hooks/useNavHook';
import { useAuth0 } from "@auth0/auth0-react";




const Login = () => {
    const navigate = useNav();
    const dispatch = useDispatch();
    const displayRef = useRef();
    const [data, setData] = useState({
        email: '',
        password: ''
    });
        const { loginWithRedirect } = useAuth0();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

      const handleGoogleLogin = ()=>{
        loginWithRedirect();
      }

    const validation = () => {
        const { email, password } = data;

        if (!email || !password) {
            toast.error('Both the email and password are required');
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

    const handleSubmit =async () => {
      
        const validationResponse = validation();
        if (validationResponse) {
            //calling the dispatch function
            
            
            const response = await dispatch(LoginUserWithEmailPassword(data));
            if(response.meta.requestStatus==='fulfilled'){
                toast.success('welcome');
                navigate('/',500)
                }else if(response.meta.requestStatus==='rejected'){
                    toast.error(response.payload.message);
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
                <h2>Login</h2>
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

                <button onClick={handleSubmit}>Sign in</button>
                <p>Forgot <span> <Link to='/forgotPassword'>Username / Password</Link></span></p>
                <p>Don't have an Account? <span><Link to='/register'>Signup</Link> </span></p>
                <button onClick={handleGoogleLogin} >Login With Google</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
