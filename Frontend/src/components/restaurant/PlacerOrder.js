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
    window.alert('Order placed');
  };

  return (
    <div>
      {dishes.map((d) => {
        return (
          <div className="card mb-3" key={d.id}>
            <div className="card-header">
              <div>Dish {d.name}</div>
              <div>Price ${d.price}</div>
              <div>
                <button className="btn-primary" onClick={() => handlePlaceOrder(d.id)}>Place order</button>
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
