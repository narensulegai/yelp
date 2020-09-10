import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dish from '../Dish';

const Dishes = ({
  images, dishes, onDishUpdate, onDishAdd, onDishDelete,
  onDishImageAdd, onDishImageDelete,
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
      {showAdd && (
      <Dish editMode={false} dish={{}} images={[]} onChange={onAdd}
        onImageAdd={() => {}} onImageDelete={() => {}}
      />
      )}
      {dishes.map((dish) => {
        return (
          <div key={dish.id}>
            <Dish editMode dish={dish} images={images.filter((i) => i.typeId === dish.id)}
              onChange={(d) => onDishUpdate(dish.id, d)}
              onImageAdd={(fileIds) => onDishImageAdd(fileIds, dish.id)}
              onImageDelete={onDishImageDelete}
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
  images: PropTypes.array,
  onDishUpdate: PropTypes.func,
  onDishAdd: PropTypes.func,
  onDishDelete: PropTypes.func,
  onDishImageAdd: PropTypes.func,
  onDishImageDelete: PropTypes.func,
};

export default Dishes;
