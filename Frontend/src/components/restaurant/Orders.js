import React, { useEffect, useRef, useState } from 'react';
import { myOrders, updateMyOrder } from '../../util/fetch/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
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

  return (
    <div className="row">
      <div className="col-12">
        <h4>Orders</h4>
        {orders.map((o) => {
          return (
            <div key={o.id}>
              <div>Restaurant : {o.restaurant.name}</div>
              <div>Dish : {o.dish.name}</div>
              <div>Status : {o.status} ({o.isPickup ? 'Pickup' : 'Delivery'})</div>

              <div className="form-group">
                <div className="font-weight-bold">
                  Change status
                </div>
                <select defaultValue={o.status} ref={(el) => status.current[o.id] = el} className="form-control">
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
              </div>
              <div>
                <button className="btn-primary" onClick={() => handleOnSave(o.id)}>Save</button>
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
