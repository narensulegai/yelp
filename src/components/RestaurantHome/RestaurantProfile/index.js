import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ImageInput from '../../ImageInput';
import TextInput from '../../TextInput';

const RestaurantProfile = ({
  images, onProfileImageAdd, onProfileImageDelete, onSave, profile,
}) => {
  const name = useRef();
  const location = useRef();
  const description = useRef();
  const contactInformation = useRef();
  const timings = useRef();
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const save = async () => {
    await onSave({
      name: name.current.value,
      location: location.current.value,
      description: description.current.value,
      contactInformation: contactInformation.current.value,
      timings: timings.current.value,
    });
    setEdit(!edit);
  };

  return (
    <div className={classNames({ edit })}>
      <ImageInput images={images} onAdd={onProfileImageAdd} onDelete={onProfileImageDelete} />
      {!edit && <button onClick={toggleEdit}>Edit</button>}
      <div>
        <span>Name</span>
        <TextInput value="text" ref={name} />
      </div>
      <div>
        <span>Location</span>
        <TextInput value="text" ref={location} />
      </div>
      <div>
        <span>Description</span>
        <TextInput value="text" ref={description} />
      </div>
      <div>
        <span>Contact information</span>
        <TextInput value="text" ref={contactInformation} />
      </div>
      <div>
        <span>Timings</span>
        <TextInput value="text" ref={timings} />
      </div>
      {edit && <button onClick={toggleEdit}>Cancel</button>}
      {edit && <button onClick={save}>Save</button>}
    </div>
  );
};

RestaurantProfile.propTypes = {
  images: PropTypes.array,
  onProfileImageAdd: PropTypes.func,
  onProfileImageDelete: PropTypes.func,
  onSave: PropTypes.func,
  profile: PropTypes.object,
};

export default RestaurantProfile;
