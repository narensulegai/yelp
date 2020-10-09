import React, { useEffect, useRef, useState } from 'react';
import {
  getRestaurantProfile, myOrders, updateMyOrder,
} from '../../util/fetch/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState('new');
  const [isPickup, setIsPickup] = useState(true);
  const status = useRef({});

  useEffect(() => {
    (async () => {
      const { isPickup } = await getRestaurantProfile();
      setIsPickup(isPickup);
      setOrders(await myOrders());
    })();
  }, []);

  const handleOnSave = async (orderId) => {
    await updateMyOrder(orderId, {
      status: status.current[orderId].value,
    });
    setOrders(await myOrders());
  };

  const handleOrderFilterChange = (e) => {
    setOrderFilter(e.target.value);
  };

  return (
    <div className="row">
      <div className="col-6">
        <h4>Orders for {isPickup ? 'pickup' : 'Yelp delivery'}</h4>
        <select value={orderFilter} onChange={handleOrderFilterChange} className="mb-3">
          <option value="new">New Orders</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled Order</option>
        </select>
        {orders
          .filter((o) => {
            if (orderFilter === 'cancelled') {
              return o.isCanceled;
            }
            if (orderFilter === 'delivered') {
              return ['picked-up', 'delivered'].includes(o.status);
            }
            if (orderFilter === 'ready') {
              return ['on-way', 'pickup-ready'].includes(o.status);
            }
            return orderFilter === o.status;
          })
          .map((o) => {
            return (
              <div key={o.id} className="card mb-3">
                <div className="card-header">
                  <div>Order number {o.id}</div>
                  <div>
                    Order placed by <a href={`#/restaurant/customer/${o.customer.id}`}>{o.customer.name}</a>
                  </div>
                  <div>Dish : {o.dish.name}</div>
                  <div>Status : {o.status}</div>
                  <div>
                    <span className="mr-3">
                      Update order
                    </span>
                    <select className="mr-3" defaultValue={o.status} ref={(el) => status.current[o.id] = el}>
                      <option value="new">Order Received</option>
                      <option value="preparing">Preparing</option>
                      {isPickup
                        ? (
                          <>
                            <option value="pickup-ready">Pickup Ready</option>
                            <option value="picked-up">Picked Up</option>
                          </>
                        )
                        : (
                          <>
                            <option value="on-way">On Way</option>
                            <option value="delivered">Delivered</option>
                          </>
                        )}
                    </select>
                    <button className="btn-primary" onClick={() => handleOnSave(o.id)}>Update</button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

Orders.propTypes = {};

export default Orders;
