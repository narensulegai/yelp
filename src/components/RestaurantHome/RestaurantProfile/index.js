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
    <div className="row">
      <div className="col-10">
        <ImageInput images={images} onAdd={onProfileImageAdd} onDelete={onProfileImageDelete} />
        <div className="card-columns mt-3">
          <TextInput label="Name" edit={edit} value={profile.name} ref={name} />
          <TextInput label="Location" edit={edit} value={profile.location} ref={location} />
          <TextInput label="Description" edit={edit} value={profile.description} ref={description} />
          <TextInput label="Contact information" edit={edit} value={profile.contactInformation} ref={contactInformation} />
          <TextInput label="Timings" edit={edit} value={profile.timings} ref={timings} />
        </div>
      </div>
      <div className="col-10 mt-5">
        {edit
          ? (
            <>
              <button className="btn btn-outline-primary" onClick={toggleEdit}>Cancel</button>
              &nbsp;
              <button className="btn btn-primary" onClick={save}>Save</button>
            </>
          )
          : (<button className="btn btn-primary" onClick={toggleEdit}>Edit</button>)}
      </div>
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
