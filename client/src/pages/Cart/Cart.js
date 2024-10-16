import React, { useEffect, useState, useMemo } from 'react';
import style from './Cart.module.css';
import { useDispatch } from 'react-redux';
import { getCart, updateQuantity } from '../../redux/reducers/ProductReducer';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCheckUserLogin from '../../hooks/useCheckUserLogin';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  useCheckUserLogin();

  const fetchCartItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dispatch(getCart());
      if (response.meta.requestStatus === "fulfilled") {
        setCartItems(response.payload || []); 
      } else {
        setError('Failed to fetch cart items.'); 
      }
    } catch (err) {
      setError('Something went wrong while fetching cart items.'); 
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (id, quantity, operation) => {
    const response = await dispatch(updateQuantity({ id, quantity, operation }));
    if (response.meta.requestStatus === "fulfilled") {
      fetchCartItems();
    } else {
      toast.error('Something went wrong while updating quantity.');
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [dispatch]);

  const calculateTotal = useMemo(() => {
    return cartItems.reduce((acc, cart) => 
      acc + cart.items.reduce((sum, item) => sum + item.item_price * item.item_quantity, 0), 0
    ).toFixed(2); 
  }, [cartItems]);

  return (
    <div className={style.main}>
      <div className={style.container}>
        <h2>Cart</h2>
        {loading && <p>Loading cart items...</p>}
        {error && <p className={style.error}>{error}</p>}
        {cartItems.length > 0 ? (
          <div className={style.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, cartIndex) =>
                  cart.items.map((item, itemIndex) => {
                    const serialNumber = cartIndex * cart.items.length + itemIndex;
                    return (
                      <tr key={`${cartIndex}-${itemIndex}`}>
                        <td>{serialNumber + 1}</td>
                        <td>
                          <img
                            src={item.item_image || 'default-image-url.jpg'}
                            alt="Product"
                            onError={(e) => { e.target.src = 'default-image-url.jpg'; }}
                            style={{ width: '50px', height: '50px' }}
                          />
                        </td>
                        <td>{item.item_title || 'Product Name'}</td>
                        <td>
                          <button onClick={() => updateItemQuantity(item.item_id, item.item_quantity, '-')}>-</button> 
                          {item.item_quantity}
                          <button onClick={() => updateItemQuantity(item.item_id, item.item_quantity, '+')}>+</button>
                        </td>
                        <td>${item.item_price.toFixed(2)}</td>
                        <td>${(item.item_price * item.item_quantity).toFixed(2)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && <p>No items in the cart.</p>
        )}
        <h3>Total: ${calculateTotal}</h3>
        {cartItems.length > 0 && (
          <button>
            <Link to='/checkout'>Checkout</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
