import React, { useEffect, useState } from 'react'
import style from './Profile.module.css'
import Orders from '../../component/Orders/Orders';
import ProfileDetails from '../../component/Profile/ProfileDetails';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../redux/reducers/UserReducer';
import useCheckUserLogin from '../../hooks/useCheckUserLogin';
import { fetchOrder } from '../../redux/reducers/orderReducer';


const Profile = () => {
  const dispatch = useDispatch();
  const [stateProfile,setStateProfile] = useState(true);
  const [stateOrders,setStateOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [user,setUser] = useState();
  const handleProfileClick =()=>{
    setStateProfile(true);
    setStateOrders(false);
  }
const handleOrdersClick = ()=>{
  setStateProfile(false);
  setStateOrders(true);
}
useCheckUserLogin();

const fetchProfileInfo = async()=>{
  const response = await dispatch(fetchUser());
  if(response.meta.requestStatus==='fulfilled'){
    setUser(response.payload);
  }
}

const fetchOrderInfo = async()=>{
  const response = await dispatch(fetchOrder());
  if(response.meta.requestStatus==='fulfilled'){
   setOrders(response.payload);
  
  }
}

useEffect(()=>{
fetchProfileInfo();
fetchOrderInfo();
},[fetchProfileInfo,fetchOrderInfo])
  
  return (
    <div className={style.main}>
        <div className={style.container}>
          <div className={style.selector}>
            <ul className={style.menu}>
              <li className={style.list}
               onClick={handleProfileClick}
               >
                Profile
              </li>
              <li className={style.list}
               onClick={handleOrdersClick}
               >
                Orders
              </li>
            </ul>
            <hr />
          </div>
    <div className={style.bodyContainer}>
    <div className={style.optionConteiner}>

    {stateProfile && user &&<ProfileDetails user={user} />}
    {stateOrders && <Orders orders={orders}/>}
          
    </div>
    </div>
        </div>
    </div>
  )
}

export default Profile
