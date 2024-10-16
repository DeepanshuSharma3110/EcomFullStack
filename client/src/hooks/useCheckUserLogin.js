import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { validateLogin } from "../redux/reducers/UserReducer";
import useNav from "./useNavHook";

const useCheckUserLogin = () => {
    const navigate=useNav();
const dispatch = useDispatch();

const checUser = async()=>{
    const response = await dispatch(validateLogin());
    if(response.meta.requestStatus="rejected");
    {
        navigate('/login',0);
    }
}
useEffect(()=>{
    checUser();
    },[dispatch,])
}

export default useCheckUserLogin
