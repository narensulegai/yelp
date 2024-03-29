import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';

const Dish = ({
  editMode, dish, onChange,
}) => {
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
  const handleOnAdd = () => {
    onChange(getForm());
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="card-columns mt-3">
              <TextInput label="Name" ref={name} edit={edit} value={dish.name} />
              <TextInput label="Ingredients" ref={ingredients} edit={edit} value={dish.ingredients} />
              <TextInput label="Price" ref={price} edit={edit} value={dish.price} />
              <TextInput label="Description" ref={description} edit={edit} value={dish.description} />
              <div className="form-group">
                <label className="font-weight-bold">Category</label>
                {edit
                  ? (
                    <select ref={category} defaultValue={dish.dishCategory} className="form-control">
                      {categories.map((c, i) => {
                        return <option key={i} value={i}>{categories[i]}</option>;
                      })}
                    </select>
                  )
                  : <div>{categories[dish.dishCategory]}</div>}
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              {(editMode && !edit) && <button className="btn-primary" onClick={toggleEdit}>Edit this dish</button>}
              {(editMode && edit) && <button className="btn-outline" onClick={toggleEdit}>Cancel</button>}
              {(editMode && edit) && <button className="btn-primary" onClick={save}>Save</button>}
              {!editMode && <button className="btn-primary" onClick={handleOnAdd}>Add a dish</button>}
            </div>
          </div>
        </div>
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
