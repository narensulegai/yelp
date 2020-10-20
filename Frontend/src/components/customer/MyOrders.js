import React, { useEffect, useState } from 'react';
import { formatDate } from '../../util';
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
            <option value="new">All Orders</option>
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
                  <div>
                    <div><b>{o.dish.name} </b> from <b>{o.name}</b></div>
                    <div>Order status <b>{o.status}</b> </div>
                  </div>
                  <div>
                    <div className="small">Delivery method <b>{o.isPickup ? 'Pickup' : 'Yelp Delivery'}</b></div>
                    <div className="small">{formatDate(o.createdAt)}</div>
                  </div>

                  <div className="mt-2">
                    <button className="btn-primary"
                      onClick={() => handleCancelOrder(o.id)}
                      disabled={o.isCanceled}>
                      {o.isCanceled ? 'Order was canceled' : 'Cancel this order'}
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
