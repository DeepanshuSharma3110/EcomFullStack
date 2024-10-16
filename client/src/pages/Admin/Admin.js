import React, { useEffect, useState } from 'react';
import style from './Admin.module.css';
import { useDispatch } from 'react-redux';
import { fetchAllUser } from '../../redux/reducers/UserReducer';
import { fetchAllItems } from '../../redux/reducers/ProductReducer';
import Alluser from './AllUser/Alluser';
import AllItems from './AllItems/AllItems';
import AllOrder from './AllOrders.js/AllOrder';
import { fetchAllOrders } from '../../redux/reducers/orderReducer';

const Admin = () => {
    const dispatch = useDispatch();
    const [userContainer, setUserContainer] = useState(true);
    const [itemContainer, setItemContainer] = useState(false);
    const [orderContainer, setOrderContainer] = useState(false);

    const [user, setUser] = useState([]);
    const [item, setItems] = useState([]);
    const [order, setOrder] = useState([]); 
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await dispatch(fetchAllUser());
            if (response.meta.requestStatus === "fulfilled") {
                setUser(response.payload);
            } else {
                setError('Failed to fetch users');
            }
        } catch (err) {
            setError('An error occurred while fetching users');
        }
    };

    const fetchItems = async () => {
        try {
            const response = await dispatch(fetchAllItems());
            if (response.meta.requestStatus === "fulfilled") {
                setItems(response.payload);
            } else {
                setError('Failed to fetch items');
            }
        } catch (err) {
            setError('An error occurred while fetching items');
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await dispatch(fetchAllOrders());
            if (response.meta.requestStatus === "fulfilled") {
                setOrder(response.payload);
            } else {
                setError('Failed to fetch orders');
            }
        } catch (err) {
            setError('An error occurred while fetching orders');
        }
    };

    useEffect(() => {
        fetchUser();
        fetchItems();
        fetchOrders();
    }, []);

    const handleContainer = (value) => {
        switch (value) {
            case 'USER':
                setOrderContainer(false);
                setItemContainer(false);
                setUserContainer(true);
                break;
            case 'ORDERS':
                setUserContainer(false);
                setItemContainer(false);
                setOrderContainer(true);
                break;
            case 'ITEMS':
                setOrderContainer(false);
                setUserContainer(false);
                setItemContainer(true);
                break;
            default:
                break;
        }
    };

    return (
        <div className={style.main}>
            <div className={style.menu}>
                <ul>
                    <li>
                        <p onClick={() => { handleContainer('USER') }}>USER</p>
                    </li>
                    <li>
                        <p onClick={() => { handleContainer('ORDERS') }}>ORDERS</p>
                    </li>
                    <li>
                        <p onClick={() => { handleContainer('ITEMS') }}>ITEMS</p>
                    </li>
                </ul>
            </div> 
            <div className={style.container}>
                {error && <p className={style.error}>{error}</p>}
                {userContainer && user.length > 0 ? <Alluser user={user} /> : userContainer && <p>No users available</p>}
                {itemContainer && item.length > 0 ? <AllItems item={item} fetchItems={fetchItems} /> : itemContainer && <p>No items available</p>}
                {orderContainer && order.length > 0 ? <AllOrder order={order} fetchOrders={fetchOrders} /> : orderContainer && <p>No orders available</p>}
            </div>
        </div>
    );
};

export default Admin;
