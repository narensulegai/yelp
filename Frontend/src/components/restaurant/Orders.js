import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import * as ql from '../../util/fetch/ql';
import { formatDate, slicePage } from '../../util';
import Paginate from '../Paginate';

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [orderFilter, setOrderFilter] = useState('new');
  const [orderOrder, setOrderOrder] = useState('asce');
  const status = useRef({});

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const { orders } = await ql.getRestaurantOrders();
      setOrders(orders);
    })();
  }, []);

  const handleOnSave = async (orderId) => {
    await ql.updateOrder(orderId, status.current[orderId].value);
    const { orders } = await ql.getRestaurantOrders();
    setOrders(orders);
  };

  const handleOrderFilterChange = (e) => {
    setOrderFilter(e.target.value);
  };

  const handleOnOrderChange = (e) => {
    setOrderOrder(e.target.value);
  };

  const applyOrderFilter = useCallback(() => {
    return [...orders
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
      .sort((a, b) => {
        const aT = new Date(a.createdAt).getTime();
        const bT = new Date(b.createdAt).getTime();
        return orderOrder === 'asce' ? aT - bT : bT - aT;
      })];
  }, [orders, orderFilter, orderOrder]);

  return (
    <div className="row">
      {orders !== null && (
        <div className="col-6">
          <h4>Orders</h4>
          <span className="mr-3">Filter by</span>
          <select value={orderFilter} onChange={handleOrderFilterChange} className="mb-3">
            <option value="new">New Orders</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled Order</option>
          </select>
          <select onChange={handleOnOrderChange} className="ml-2">
            <option value="aesc">Recent orders last</option>
            <option value="desc">Recent orders first</option>
          </select>
          {slicePage(applyOrderFilter(), currentPage)
            .map((o) => {
              return (
                <div key={o.id} className="card mb-3">
                  <div className="card-header">
                    <h4><b>{o.dish.name}</b></h4>
                    <div>
                      <b>{o.isPickup ? 'Pickup' : 'Yelp delivery'}</b>
                      &nbsp;for <a href={`#/restaurant/customer/${o.customer.id}`}>{o.customer.name}</a>
                    </div>
                    <div>Order status <b>{o.status}</b></div>
                    <div>
                      <span className="mr-2">
                        Update order status
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
                    <div className="small">{formatDate(o.createdAt)}</div>
                  </div>
                </div>
              );
            })}
          {applyOrderFilter().length === 0
          && <div>No orders to show</div>}
          <Paginate currentPage={currentPage} onPageChange={setCurrentPage}
            numItems={applyOrderFilter().length} />
        </div>
      )}
    </div>
  );
};

Orders.propTypes = {};

export default Orders;
