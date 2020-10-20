import React, { useEffect, useState } from 'react';
import { pick } from 'lodash';
import Dish from './Dish';
import {
  createDish, deleteDish, getDishes, updateDish,
} from '../util/fetch/api';

const Dishes = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    (async () => {
      setDishes(await getDishes());
    })();
  }, []);

  const update = (id, dish) => {
    return updateDish(id, pick(dish, ['fileIds', 'name', 'ingredients', 'price', 'description', 'dishCategory']))
      .then(async () => {
        setDishes(await getDishes());
      });
  };
  const handleOnDishImageAdd = async (fileIds, dish) => {
    // Needs refactor, use dish id only
    return update(dish.id, { ...dish, fileIds: dish.fileIds.concat(fileIds.files) });
  };

  const handleOnDishImageDelete = async (fileId, dish) => {
    return update(dish.id, { ...dish, fileIds: dish.fileIds.filter((f) => f !== fileId) });
  };

  const handleOnDishUpdate = (id, dish) => {
    return update(id, dish);
  };

  const handleOnDishAdd = async (dish) => {
    return createDish(dish)
      .then(async () => {
        setDishes(await getDishes());
        setShowAdd(false);
      });
  };

  const handleOnDishDelete = async (id) => {
    await deleteDish(id);
    setDishes(await getDishes());
  };

  return (
    <div className="row">
      <div className="col-12">
        {showAdd
          ? (
            <>
              <Dish editMode={false} addMode dish={{}} images={[]} onChange={handleOnDishAdd}
                onImageAdd={() => {}} onImageDelete={() => {}} />
              <button onClick={() => { setShowAdd(false); }} className="btn-primary mt-3">
                Cancel
              </button>
            </>
          )
          : (
            <button onClick={() => { setShowAdd(true); }} className="btn-primary text-right">
              Add a new dish
            </button>
          )}
      </div>

      {!showAdd && (
      <div className="col-12">
        {dishes.length === 0 ? <div>You have not added any dishes, please add one</div> : null}
        {dishes.map((dish) => {
          return (
            <div key={dish.id} className="mt-3">
              <Dish editMode addMode={false} dish={dish}
                images={dish.fileIds}
                onChange={(d) => handleOnDishUpdate(dish.id, d)}
                onDelete={() => handleOnDishDelete(dish.id)}
                onImageAdd={(fileIds) => handleOnDishImageAdd(fileIds, dish)}
                onImageDelete={(fileId) => handleOnDishImageDelete(fileId, dish)}
                  />
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};

Dishes.propTypes = {};

export default Dishes;
