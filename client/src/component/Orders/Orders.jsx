import React from 'react';
import style from './Orders.module.css';

const Orders = ({ orders }) => {
  return (
    <div className={style.main}>
      <div className={style.container}>
        {orders &&
          orders.map((o) => (
            <div className={style.order} key={o._id}>
              <div className={style.bar}>
                <h2>{new Date(o.createdAt).toLocaleString()}</h2>
                <h3>{o.status}</h3>
                <span>
                  <h3>{o.mode}</h3>
                  <h3>{o.amount} Rs</h3>
                </span>
              </div>

              <div className={`${style.address}`}>
                <p>{o.user.address}</p>
              </div>

              {o.cart.map((i) => (
                <ul key={i._id}>
                    {i.items.map((p) => (
                      <li key={p.item_id}>
                        <h4>{p.item_title}</h4>
                        <h4>x {p.item_quantity}</h4>
                        <h4>{p.item_price} Rs</h4>
                      </li>
                    ))
                  }
                </ul>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
