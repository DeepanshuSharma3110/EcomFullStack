import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './AllOrder.module.css';
import { updateOrderStatus } from '../../../redux/reducers/orderReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AllOrder = ({ order,fetchOrders }) => {
const dispatch = useDispatch();
    
useEffect(()=>{
    fetchOrders();
},[dispatch])

const handleChange = async (e, orderId) => {
    const newStatus = e.target.value;
    const response = await dispatch(updateOrderStatus({ orderId, newStatus }));
    if (updateOrderStatus.fulfilled.match(response)) {
        toast.success('Status updated successfully:')
        fetchOrders();
    } else {
        toast.error('Failed to update status')
    }
};

    return (
        <div className={style.main}>
            <div className={style.container}>
            <ToastContainer />
                {order.map((o) => (
                    <div className={style.orderContainer} key={o._id}>
                        <div className={style.menu}>
                            <p>{o.user.email}</p>
                            <p>{o.user.phoneNumber}</p>
                            <p>{o.mode}</p>
                            <select 
                                name="status_option" 
                                value={o.status} 
                                onChange={(e) => handleChange(e, o._id)}
                            >
                                <option value="PENDING">PENDING</option>
                                <option value="TRANSIT">TRANSIT</option>
                                <option value="REJECTED">REJECTED</option>
                                <option value="DELIVERED">DELIVERED</option>
                            </select>
                        </div>
                        <div className={style.address}>
                            <p>{o.user.address}</p>
                        </div>
                        <div>
                            {o.cart.map((crt) => (
                                crt.items.map((i) => (
                                    <div key={i.item_id} className={style.cartItem}>
                                        <span>{i.item_title} | {i.item_quantity} | {i.item_price}</span>
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllOrder;
