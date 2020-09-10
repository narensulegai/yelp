import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dish from '../Dish';

const Dishes = ({
  dishes, onDishUpdate, onDishAdd, onDishDelete,
}) => {
  const [showAdd, setShowAdd] = useState(false);

  const onAdd = (dish) => {
    return onDishAdd(dish)
      .then(() => {
        setShowAdd(false);
      });
  };
  const handleOnDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      onDishDelete(id);
    }
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
            <Dish
              editMode
              dish={dish}
              onChange={(d) => onDishUpdate(dish.id, d)}
            />
            <div>
              <button onClick={() => handleOnDelete(dish.id)}>Delete dish</button>
            </div>
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
  onDishDelete: PropTypes.func,
};

export default Dishes;
