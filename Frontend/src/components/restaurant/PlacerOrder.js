import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getRestaurantDishes, myOrders, placeOrder } from '../../util/fetch/api';
import Carousal from '../Carousal';
import AddReview from './AddReview';
import Paginate from '../Paginate';
import { slicePage } from '../../util';
import { setMyOrders } from '../../actions';

const PlaceOrder = ({ restaurantId }) => {
  const [dishes, setDishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const deliveryMode = useRef({});
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      setDishes(await getRestaurantDishes(restaurantId));
    })();
  }, [restaurantId]);

  const handlePlaceOrder = async (dishId) => {
    // TODO
    await placeOrder(dishId, { isPickup: deliveryMode.current[dishId].value === 'pickup' });
    dispatch(setMyOrders(await myOrders()));
    window.alert('Your order has been placed!');
  };

  return (
    <div className="mb-3">
      {dishes.length === 0 ? <div>Restaurant has not listed any dishes yet.</div> : null}
      {slicePage(dishes, currentPage).map((d) => {
        return (
          <div className="card mb-3" key={d.id}>
            <div className="card-header d-flex">
              {/* Order dish */}
              <div className="flex-grow-1">

                <div><b>{d.name}</b></div>
                <div className="small">{d.description}</div>
                <div className="small">Made with {d.ingredients}</div>

                <div className="mt-2">
                  <Carousal images={d.fileIds} />
                </div>

                <div className="mt-2">Order one for <b>${d.price}</b></div>

                <div>
                  <label className="mr-3">Select delivery method</label>
                  <select defaultValue="delivery" ref={(e) => deliveryMode.current[d.id] = e} className="mr-3">
                    <option value="delivery">Yelp delivery</option>
                    <option value="pickup">Pickup</option>
                  </select>
                  <button className="btn-primary" onClick={() => handlePlaceOrder(d.id)}>Order dish</button>
                </div>

              </div>
              {/* Review dish */}
              <div className="flex-grow-1">
                <AddReview dish={d} />
              </div>
            </div>
          </div>
        );
      })}
      <Paginate numItems={dishes.length} onPageChange={setCurrentPage} currentPage={currentPage} />
    </div>
  );
};

PlaceOrder.propTypes = {
  restaurantId: PropTypes.string,
};

export default PlaceOrder;
