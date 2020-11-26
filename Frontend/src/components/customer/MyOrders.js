import React, { useCallback, useEffect, useState } from 'react';
import { formatDate } from '../../util';
import * as ql from '../../util/fetch/ql';

const MyOrders = () => {
  const [orderFilter, setOrderFilter] = useState('new');
  const [orderOrder, setOrderOrder] = useState('asce');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const cust = await ql.getCurrentCustomer();
      setOrders(cust.orders);
    })();
  }, []);

  const handleOrderFilterChange = (e) => {
    setOrderFilter(e.target.value);
  };

  const handleOnOrderChange = () => {
    setOrderOrder(orderOrder === 'asce' ? 'desc' : 'asce');
  };

  const applyOrderFilter = useCallback(() => {
    return [...orders
      .filter((o) => {
        if (orderFilter === 'preparing') {
          return orderFilter === o.status;
        }
        return true;
      })
      .sort((a, b) => {
        const aT = new Date(parseInt(a.createdAt)).getTime();
        const bT = new Date(parseInt(b.createdAt)).getTime();
        return orderOrder === 'asce' ? aT - bT : bT - aT;
      })];
  }, [orders, orderFilter, orderOrder]);

  return (
    <div className="row">
      {orders !== null && (
        <div className="col-6">
          <h4>My Orders</h4>
          <div className="mb-3">
            <span className="mr-3">Filter by</span>
            <select value={orderFilter} onChange={handleOrderFilterChange}>
              <option value="new">All Orders</option>
              <option value="preparing">Preparing</option>
            </select>
            <select value={orderOrder} onChange={handleOnOrderChange} className="ml-2">
              <option value="aesc">Recent orders last</option>
              <option value="desc">Recent orders first</option>
            </select>
          </div>

          {applyOrderFilter()
            .map((o) => {
              return (
                <div key={o.id} className="card mb-3">
                  <div className="card-header">
                    <div>
                      <div><b>{o.dish.name} </b></div>
                      <div>Order status <b>{o.status}</b></div>
                    </div>
                    <div>
                      <div className="small">Delivery method <b>{o.isPickup ? 'Pickup' : 'Yelp Delivery'}</b></div>
                      <div className="small">{formatDate(o.createdAt)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

MyOrders.propTypes = {};

export default MyOrders;
