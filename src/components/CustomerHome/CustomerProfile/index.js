import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ImageInput from '../../ImageInput';
import TextInput from '../../TextInput';

const CustomerProfile = ({
  images, onProfileImageAdd, onProfileImageDelete, onSave, profile,
}) => {
  const name = useRef();
  const about = useRef();
  const yelpingSince = useRef();
  const thingsILove = useRef();
  const website = useRef();
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const save = async () => {
    await onSave({
      name: name.current.value,
      about: about.current.value,
      yelpingSince: yelpingSince.current.value,
      thingsILove: thingsILove.current.value,
      website: website.current.value,
    });
    setEdit(!edit);
  };

  return (
    <div className="row">
      <div className="col-10">
        <ImageInput images={images} onAdd={onProfileImageAdd} onDelete={onProfileImageDelete} />
        <div className="card-columns mt-3">
          <TextInput label="Name" edit={edit} value={profile.name} ref={name} />
          <TextInput label="About" edit={edit} value={profile.about} ref={about} />
          <TextInput label="Yelping Since" edit={edit} value={profile.yelpingSince} ref={yelpingSince} />
          <TextInput label="Things I love" edit={edit} value={profile.thingsILove} ref={thingsILove} />
          <TextInput label="Website" edit={edit} value={profile.website} ref={website} />
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

CustomerProfile.propTypes = {
  images: PropTypes.array,
  onProfileImageAdd: PropTypes.func,
  onProfileImageDelete: PropTypes.func,
  onSave: PropTypes.func,
  profile: PropTypes.object,
};

export default CustomerProfile;
