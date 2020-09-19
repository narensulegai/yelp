import React, { useEffect, useState } from 'react';
import Dish from './Dish';
import {
  addImages, createDish, deleteDish, deleteImage, getDishes, getImages, updateDish,
} from '../util/fetch/api';

const Dishes = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [images, setImages] = useState([]);
  const [dishes, setDishes] = useState([]);

  const getDishImages = async () => {
    const imgs = await getImages();
    return imgs.filter((i) => i.type === 'dish');
  };
  useEffect(() => {
    (async () => {
      setImages(await getDishImages());
      setDishes(await getDishes());
    })();
  }, []);

  const handleOnDishImageAdd = async (fileIds, typeId) => {
    await addImages({ fileIds: fileIds.files, type: 'dish', typeId });
    setImages(await getDishImages());
  };

  const handleOnDishImageDelete = async (id) => {
    await deleteImage(id);
    setImages(await getDishImages());
  };

  const handleOnDishUpdate = async (id, dish) => {
    return updateDish(id, dish)
      .then(async () => {
        setDishes(await getDishes());
      });
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
      <div className="col-10">
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
            <button onClick={() => { setShowAdd(true); }} className="btn-primary">
              Add a new dish
            </button>
          )}
        {!showAdd && (
          <div className="mt-3">
            {dishes.map((dish) => {
              return (
                <div key={dish.id} className="mt-3">
                  <Dish editMode addMode={false} dish={dish}
                    images={images.filter((i) => i.typeId === dish.id)}
                    onChange={(d) => handleOnDishUpdate(dish.id, d)}
                    onDelete={() => handleOnDishDelete(dish.id)}
                    onImageAdd={(fileIds) => handleOnDishImageAdd(fileIds, dish.id)}
                    onImageDelete={handleOnDishImageDelete}
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

Dishes.propTypes = {};

export default Dishes;
