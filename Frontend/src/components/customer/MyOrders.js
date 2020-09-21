import React, { useEffect, useState } from 'react';
import { myOrders, updateMyOrder } from '../../util/fetch/api';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState('new');
  useEffect(() => {
    (async () => {
      setOrders(await myOrders());
    })();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel the order?')) {
      await updateMyOrder(orderId, { isCanceled: true });
      setOrders(await myOrders());
    }
  };
  const handleOrderFilterChange = (e) => {
    setOrderFilter(e.target.value);
  };
  return (
    <div>
      <h4>My Orders</h4>
      <select value={orderFilter} onChange={handleOrderFilterChange}>
        <option value="new">My Orders</option>
        <option value="preparing">Preparing</option>
      </select>
      {orders
        .filter((o) => {
          if (orderFilter === 'preparing') {
            return orderFilter === o.status;
          }
          return true;
        })
        .map((o) => {
          return (
            <div key={o.id}>
              <div>Restaurant : {o.restaurant.name}</div>
              <div>Dish : {o.dish.name}</div>
              <div>Status : {o.status} ({o.isPickup ? 'Pickup' : 'Delivery'})</div>
              <div>
                <button className="btn-primary"
                  onClick={() => handleCancelOrder(o.id)}
                  disabled={o.isCanceled}>
                  {o.isCanceled ? 'Order canceled' : 'Cancel'}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

MyOrders.propTypes = {};

export default MyOrders;
