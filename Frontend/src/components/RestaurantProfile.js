import React, { useEffect, useRef, useState } from 'react';
import TextInput from './TextInput';
import * as ql from '../util/fetch/ql';

const RestaurantProfile = () => {
  const description = useRef();
  const contactInformation = useRef();
  const timings = useRef();
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {
    (async () => {
      setProfile(await ql.getCurrentRestaurant());
    })();
  }, []);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const update = async (restaurantProfile) => {
    await ql.updateRestaurantProfile(restaurantProfile);
    setProfile(await ql.getCurrentRestaurant());
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

  return (
    <div className="row">
      <div className="col-6">
        {profile && (
        <>
          <h4>Restaurant profile</h4>
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
        </>
        )}
      </div>
    </div>
  );
};

RestaurantProfile.propTypes = {};

export default RestaurantProfile;
