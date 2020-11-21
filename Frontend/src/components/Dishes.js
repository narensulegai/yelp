import React, { useEffect, useState } from 'react';
import Dish from './Dish';
import * as ql from '../util/fetch/ql';
import Paginate from './Paginate';
import { slicePage } from '../util';

const Dishes = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    (async () => {
      const r = await ql.getCurrentRestaurant();
      setDishes(r.dishes);
    })();
  }, []);

  const update = async (id, dish) => {
    await ql.updateDish(id, dish);
    const r = await ql.getCurrentRestaurant();
    setDishes(r.dishes);
  };

  const handleOnDishUpdate = (id, dish) => {
    return update(id, dish);
  };

  const handleOnDishAdd = async (dish) => {
    await ql.createDish(dish);
    const r = await ql.getCurrentRestaurant();
    setDishes(r.dishes);
    setShowAdd(false);
  };

  return (
    <div className="row">
      <div className="col-12">
        {dishes.length === 0 ? <h6>You have not added any dishes, please add one</h6> : null}
        {showAdd
          ? (
            <>
              <Dish editMode={false} addMode dish={{}} onChange={handleOnDishAdd} />
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
        {slicePage(dishes, currentPage).map((dish) => {
          return (
            <div key={dish.id} className="mt-3">
              <Dish editMode dish={dish}
                onChange={(d) => handleOnDishUpdate(dish.id, d)} />
            </div>
          );
        })}
        <Paginate numItems={dishes.length}
          onPageChange={setCurrentPage} currentPage={currentPage} />
      </div>
      )}
    </div>
  );
};

Dishes.propTypes = {};

export default Dishes;
