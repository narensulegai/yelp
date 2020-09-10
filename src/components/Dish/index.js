import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ImageInput from '../ImageInput';
import TextInput from '../TextInput';

const Dish = ({ editMode, dish, onChange }) => {
  const name = useRef();
  const ingredients = useRef();
  const price = useRef();
  const category = useRef();
  const description = useRef();
  const [edit, setEdit] = useState(!editMode);
  const categories = ['Appetizer', 'Salads', 'Main course', 'Desserts', 'Beverages'];

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const getForm = () => {
    return {
      name: name.current.value,
      ingredients: ingredients.current.value,
      price: price.current.value,
      description: description.current.value,
      dishCategory: parseInt(category.current.value),
    };
  };
  const save = () => {
    return onChange(getForm()).then(toggleEdit);
  };
  const add = () => {
    onChange(getForm());
  };
  return (
    <div className={classNames({ edit })}>
      <div>
        {(editMode && !edit) && <button onClick={toggleEdit}>Edit</button>}
      </div>
      <div>
        <div className="d-flex">
          <div>Name</div>
          <TextInput ref={name} edit={edit} value={dish.name} />
        </div>
        <div className="d-flex">
          <div>Ingredients</div>
          <TextInput ref={ingredients} edit={edit} value={dish.ingredients} />
        </div>
        <div className="d-flex">
          <div>Price</div>
          <TextInput ref={price} edit={edit} value={dish.price} />
        </div>
        <div className="d-flex">
          <div>Description</div>
          <TextInput ref={description} edit={edit} value={dish.description} />
        </div>
        <div className="d-flex">
          <div>Category</div>
          <div>
            {edit && (
            <select ref={category} defaultValue={dish.dishCategory}>
              {categories.map((c, i) => {
                return <option key={i} value={i}>{categories[i]}</option>;
              })}
            </select>
            )}
            {!edit && <div>{categories[dish.dishCategory]}</div>}
          </div>
        </div>
      </div>
      <div>
        {(editMode && edit) && <button onClick={toggleEdit}>Cancel</button>}
        {(editMode && edit) && <button onClick={save}>Save</button>}
        {!editMode && <button onClick={add}>Add</button>}
      </div>
    </div>
  );
};

Dish.propTypes = {
  editMode: PropTypes.bool,
  dish: PropTypes.object,
  onChange: PropTypes.func,
};

export default Dish;
