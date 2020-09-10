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

  return (
    <div className="row">
      <div className="col-10">
        {showAdd
          ? (
            <>
              <Dish editMode={false} addMode dish={{}} images={[]} onChange={onAdd}
                onImageAdd={() => {}} onImageDelete={() => {}} />
              <button onClick={() => { setShowAdd(!showAdd); }} className="btn-primary mt-3">Cancel</button>
            </>
          )
          : (
            <button onClick={() => { setShowAdd(!showAdd); }} className="btn-primary">Add a new dish</button>
          )}
        {!showAdd && (
        <div className="mt-3">
          {dishes.map((dish) => {
            return (
              <div key={dish.id} className="mt-3">
                <Dish editMode addMode={false} dish={dish}
                  images={images.filter((i) => i.typeId === dish.id)}
                  onChange={(d) => onDishUpdate(dish.id, d)}
                  onDelete={() => onDishDelete(dish.id)}
                  onImageAdd={(fileIds) => onDishImageAdd(fileIds, dish.id)}
                  onImageDelete={onDishImageDelete}
            />
              </div>
            );
          })}
        </div>
        )}
      </div>
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
