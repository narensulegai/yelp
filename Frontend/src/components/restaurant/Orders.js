import React, { useEffect, useRef, useState } from 'react';
import {
  myOrders, updateMyOrder,
} from '../../util/fetch/api';
import { formatDate } from '../../util';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState('new');
  const status = useRef({});

  useEffect(() => {
    (async () => {
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
        <h4>Orders</h4>
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
                  <h4><b>{o.dish.name}</b>&nbsp;order #{o.id}</h4>
                  <div className="small">{formatDate(o.createdAt)}</div>
                  <div>
                    <b>{o.isPickup ? 'Pickup' : 'Yelp delivery'}</b>
                    &nbsp;for <a href={`#/restaurant/customer/${o.customer.id}`}>{o.customer.name}</a>
                  </div>
                  <div>Order status <b>{o.status}</b></div>
                  <div>
                    <span className="mr-3">
                      Update order status to
                    </span>
                    <select className="mr-3" defaultValue={o.status} ref={(el) => status.current[o.id] = el}>
                      <option value="new">Order Received</option>
                      <option value="preparing">Preparing</option>
                      {o.isPickup
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
