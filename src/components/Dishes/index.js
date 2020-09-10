import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dish from '../Dish';

const Dishes = ({ dishes, onDishUpdate, onDishAdd }) => {
  const [showAdd, setShowAdd] = useState(false);

  const onAdd = (dish) => {
    return onDishAdd(dish)
      .then(() => {
        setShowAdd(false);
      });
  };

  return (
    <div>
      <button onClick={() => { setShowAdd(!showAdd); }}>
        {showAdd ? 'Cancel' : 'Add dish'}
      </button>
      {showAdd && <Dish editMode={false} dish={{}} onChange={onAdd} />}
      {dishes.map((dish) => {
        return (
          <div key={dish.id}>
            <Dish editMode dish={dish} onChange={(d) => onDishUpdate(dish.id, d)} />
          </div>
        );
      })}
    </div>
  );
};

Dishes.propTypes = {
  dishes: PropTypes.array,
  onDishUpdate: PropTypes.func,
  onDishAdd: PropTypes.func,
};

export default Dishes;
