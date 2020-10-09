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
    <div className="row">
      <div className="col-6">
        <h4>My Orders</h4>
        <div className="mb-3">
          <span className="mr-3">Filter by</span>
          <select value={orderFilter} onChange={handleOrderFilterChange}>
            <option value="new">New Orders</option>
            <option value="preparing">Preparing</option>
          </select>
        </div>

        {orders
          .filter((o) => {
            if (orderFilter === 'preparing') {
              return orderFilter === o.status;
            }
            return true;
          })
          .map((o) => {
            return (
              <div key={o.id} className="card mb-3">
                <div className="card-header">
                  <div>Restaurant : {o.restaurant.name}</div>
                  <div>Dish : {o.dish.name}</div>
                  <div>Status : {o.status} for {o.restaurant.isPickup ? 'Pickup' : 'Yelp Delivery'}</div>
                  <div className="mt-2">
                    <button className="btn-primary"
                      onClick={() => handleCancelOrder(o.id)}
                      disabled={o.isCanceled}>
                      {o.isCanceled ? 'Order canceled' : 'Cancel Order'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

MyOrders.propTypes = {};

export default MyOrders;
