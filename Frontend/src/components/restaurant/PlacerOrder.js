import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getRestaurantDishes, placeOrder } from '../../util/fetch/api';

const PlaceOrder = ({ restaurantId }) => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    (async () => {
      setDishes(await getRestaurantDishes(restaurantId));
    })();
  }, [restaurantId]);

  const handlePlaceOrder = async (dishId) => {
    await placeOrder(dishId);
    window.alert('Your order has been placed!');
  };

  return (
    <div className="mb-3">
      {dishes.length === 0 ? <div>Restaurant has not listed any dishes yet.</div> : null}
      {dishes.map((d) => {
        return (
          <div className="card mb-3" key={d.id}>
            <div className="card-header">
              <div>Dish <b>{d.name}</b></div>
              <div>Price <b>${d.price}</b></div>
              <div className="mt-2">
                <button className="btn-primary" onClick={() => handlePlaceOrder(d.id)}>Order dish</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

PlaceOrder.propTypes = {
  restaurantId: PropTypes.number,
};

export default PlaceOrder;
