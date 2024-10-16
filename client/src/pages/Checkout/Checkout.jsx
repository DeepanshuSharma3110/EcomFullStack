import React, { useEffect, useState } from 'react';
import style from './Checkout.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../redux/reducers/UserReducer';
import { clearCart, getCart } from '../../redux/reducers/ProductReducer';
import { submitOrder, submitPrepaidOrder } from '../../redux/reducers/orderReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useNav from '../../hooks/useNavHook';
import { PAYMENT } from '../../ServerRoughts.js';
import axios from 'axios';

const Checkout = () => {
    const [addressStatus, setAddressStatus] = useState(false);
    const [orderStatus, setOrderStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [cart, setCart] = useState([]);
    const [amount, setAmount] = useState(0);
    const [verification, setVerification] = useState(false);
    const [responseId, setResponseId] = useState("");
    const [responseState, setResponseState] = useState([]);

    const dispatch = useDispatch();
    const Navigate = useNav();

    const fetchUserInfo = async () => {
        setLoading(true);
        try {
            const infoResponse = await dispatch(fetchUser());
            if (infoResponse.meta.requestStatus === "fulfilled") {
                const { username, address1, address2, state, pincode, phoneNumber, _id, email } = infoResponse.payload;
                const userDetails = { name: username, address: `${address1}, ${address2}, ${state}, ${pincode}`, phoneNumber, email, _id };
                setUser(userDetails);
            }
        } catch (error) {
            toast.error("Failed to fetch user details");
        } finally {
            setLoading(false);
        }
    };

    const fetchCartDetails = async () => {
        setLoading(true);
        try {
            const cartResponse = await dispatch(getCart());
            if (cartResponse.meta.requestStatus === "fulfilled") {
                setCart(cartResponse.payload);
                const totalAmount = cartResponse.payload.reduce((acc, cartItem) => 
                    acc + cartItem.items.reduce((sum, item) => sum + item.item_price * item.item_quantity, 0), 
                0);
                setAmount(totalAmount);
            }
        } catch (error) {
            toast.error("Failed to fetch cart details");
        } finally {
            setLoading(false);
        }
    };

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const createRazorpayOrder = async () => {
        try {
            const data = JSON.stringify({ amount: amount, currency: "INR" });
            const config = {
                method: "post",
                maxBodyLength: Infinity,
                url: PAYMENT,
                headers: { 'Content-Type': 'application/json' },
                data: data
            };

            const response = await axios.request(config);
            handleRazorpayScreen(response.data.amount);
        } catch (error) {
            toast.error("Error creating Razorpay order");
        }
    };

    const handleRazorpayScreen = async (amount) => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.error("Failed to load Razorpay SDK");
            return;
        }

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: amount,
            currency: 'INR',
            name: user?.name || "Customer",
            description: "Payment for Ecom Test",
            image: "https://papayacoders.com/demo.png",
            handler: async (response) => {
                try {
                    setResponseId(response.razorpay_payment_id);
                    toast.success('Payment successful');

                    // Submit the order and clear the cart after the payment is successful
                    const prepaidResponse = await dispatch(submitPrepaidOrder({ user, cart, mode: 'PREPAID', amount, responseId: response.razorpay_payment_id }));
                    if (prepaidResponse.meta.requestStatus === "fulfilled") {
                        const itemResponse = await dispatch(clearCart());
                        if (itemResponse.meta.requestStatus === "fulfilled") {
                            resetState();
                        }
                    }
                } catch (error) {
                    toast.error("Error processing your order after payment");
                }
            },
            prefill: {
                name: user?.name,
                email: user?.email
            },
            theme: { color: "#F4C430" }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const paymentFetch = async (e) => {
        e.preventDefault();
        try {
            const paymentId = e.target.paymentId.value;
            const response = await axios.get(`${PAYMENT}/${paymentId}`);
            setResponseState(response.data);
        } catch (error) {
            toast.error("Error fetching payment details");
        }
    };

    const handleOrder = async (paymentMode) => {
        setLoading(true);
        try {
            if (paymentMode === 'PREPAID') {
                // Create the Razorpay order for prepaid payment
                await createRazorpayOrder();
            } else if (paymentMode === 'COD') {
                const codResponse = await dispatch(submitOrder({ user, cart, mode: paymentMode, amount }));
                if (codResponse.meta.requestStatus === "fulfilled") {
                    const itemResponse = await dispatch(clearCart());
                    if (itemResponse.meta.requestStatus === "fulfilled") {
                        resetState();
                    }
                }
            }
        } catch (error) {
            toast.error("Error submitting order");
        } finally {
            setLoading(false);
        }
    };

    const resetState = () => {
        setCart([]);
        setOrderStatus(false);
        setAddressStatus(false);
        toast.success('Order submitted');
        Navigate('/user');
        setResponseId('');
    };

    useEffect(() => {
        fetchUserInfo();
        fetchCartDetails();
    }, [dispatch]);

    return (
        <div className={style.main}>
            <ToastContainer />
            {loading && <p>Loading...</p>}
            {user && (
                <div className={style.addressContainer}>
                    <h3>{user.name}</h3>
                    <span><label>Address</label> <p>{user.address}</p></span>
                    <span><label>Phone Number</label><p>{user.phoneNumber}</p></span>
                    <span><label>Email</label><p>{user.email}</p></span>
                    <button disabled={loading}><Link to='/user'>Edit Address</Link></button>
                    <button onClick={() => setAddressStatus(true)} disabled={loading}>Confirm Address</button>
                </div>
            )}

            {cart && addressStatus && (
                <div className={style.ProductContainer}>
                    {cart.map((cartItem, index) => (
                        <div className={style.item} key={index}>
                            {cartItem.items.map((c) => (
                                <span key={c.item_id}>
                                    <p>{c.item_title}</p> 
                                    <p>x{c.item_quantity}</p> 
                                    <p>{c.item_price.toFixed(1)} Rs</p> 
                                </span>
                            ))}
                        </div>
                    ))}
                    <h3>Total {amount.toFixed(1)} Rs</h3>
                    <button onClick={() => setOrderStatus(true)} disabled={loading}>Confirm</button>
                </div>
            )}

            {addressStatus && orderStatus && (
                <div className={style.paymentMode}>
                    <button onClick={() => handleOrder('COD')} disabled={loading}>COD</button>
                    <button onClick={() => handleOrder('PREPAID')} disabled={loading}>Pay Online</button>
                </div>
            )}

            {verification && (
                <form onSubmit={paymentFetch}>
                    <input type="text" name="paymentId" />
                    <button type="submit">Fetch Payment</button>
                    {responseState.length !== 0 && (
                        <ul>
                            <li>Amount: {responseState.amount / 100} Rs.</li>
                            <li>Currency: {responseState.currency}</li>
                            <li>Status: {responseState.status}</li>
                            <li>Method: {responseState.method}</li>
                        </ul>
                    )}
                </form>
            )}
        </div>
    );
};

export default Checkout;
