import React, { useEffect, useRef, useState } from 'react';
import ImageInput from './ImageInput';
import TextInput from './TextInput';
import {
  getRestaurantProfile, updateRestaurantProfile,
} from '../util/fetch/api';

const RestaurantProfile = () => {
  const description = useRef();
  const contactInformation = useRef();
  const timings = useRef();
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState({});

  const toggleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    (async () => {
      setProfile(await getRestaurantProfile());
    })();
  }, []);

  const update = (p) => {
    return updateRestaurantProfile(p)
      .then(async () => {
        setProfile(await getRestaurantProfile());
      });
  };
  const handleOnProfileSave = async () => {
    const p = {
      description: description.current.value,
      contactInformation: contactInformation.current.value,
      timings: timings.current.value,
    };
    await update(p);
    setEdit(!edit);
  };

  const handleOnProfileImageAdd = async (fileIds) => {
    await update({ fileIds: fileIds.files });
  };

  const handleOnProfileImageDelete = async (id) => {
    await update({ fileIds: profile.fileIds.filter((f) => f !== id) });
  };

  return (
    <div className="row">
      <div className="col-6">
        <h4>Restaurant profile</h4>
        <ImageInput images={profile.fileIds}
          onAdd={handleOnProfileImageAdd} onDelete={handleOnProfileImageDelete} />
        <TextInput label="Name" edit={false} value={profile.name} />
        <TextInput label="Location" edit={false} value={profile.location} />
        <TextInput label="Description" edit={edit} value={profile.description} ref={description} />
        <TextInput label="Contact information" edit={edit} value={profile.contactInformation} ref={contactInformation} />
        <TextInput label="Timings" edit={edit} value={profile.timings} ref={timings} />

        <div className="d-flex justify-content-between">
          {edit
            ? (
              <>
                <button className="btn-outline-primary" onClick={toggleEdit}>Cancel</button>
                <button className="btn-primary" onClick={handleOnProfileSave}>Save</button>
              </>
            )
            : <button className="btn-primary" onClick={toggleEdit}>Edit</button>}
        </div>
      </div>
    </div>
  );
};

RestaurantProfile.propTypes = {};

export default RestaurantProfile;
