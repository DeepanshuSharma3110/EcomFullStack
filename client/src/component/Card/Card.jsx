import React from 'react';
import style from './Card.module.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/reducers/ProductReducer';
import useNav from '../../hooks/useNavHook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNav();

  const handleClick =async(e)=>{
        const response = await dispatch(addToCart(e));
        if(response.payload.message === 'Please login first'){
          toast.error("Please login first");
          navigate('/login',1000)
        } else if(response.meta.requestStatus ==='fulfilled'){
          toast.success(response.payload.data.message)
        }else if(response.meta.requestStatus==='rejected' || response.payload.message==='Invalid token'){
          toast.error('please login again');
        }else {
          toast.error(response.payload.message);
        }
       
  }

  return (
    <div className={style.card} key={item._id}>
         <ToastContainer />
      <img src={item.image} alt={item.title} className={style.image} />
      <h3 className={style.title}>{item.title}</h3>
      <h4 className={style.price}>{item.price}</h4>
      <button onClick={(e)=>handleClick(item)}>Add To Cart</button>
    </div>
  );
}

export default Card;
