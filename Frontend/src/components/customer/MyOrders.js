import React, { useEffect, useState } from 'react';
import { myOrders } from '../../util/fetch/api';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      setOrders(await myOrders());
    })();
  }, []);

  return (
    <div>
      <h4>My Orders</h4>
      {orders.map((o) => {
        return (
          <div key={o.id}>
            <div>Restaurant : {o.restaurant.name}</div>
            <div>Dish : {o.dish.name}</div>
            <div>Status : {o.status} ({o.isPickup ? 'Pickup' : 'Delivery'}) </div>
          </div>
        );
      })}
    </div>
  );
};

MyOrders.propTypes = {

};

export default MyOrders;
