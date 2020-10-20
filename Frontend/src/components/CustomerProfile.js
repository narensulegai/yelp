import React, { useEffect, useRef, useState } from 'react';
import ImageInput from './ImageInput';
import TextInput from './TextInput';
import {
  addImages, deleteImage, getCustomerProfile, getImages, updateCustomerProfile,
} from '../util/fetch/api';

const CustomerProfile = () => {
  const about = useRef();
  const yelpingSince = useRef();
  const thingsILove = useRef();
  const website = useRef();
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getCustomerProfile().then(setProfile);
  }, []);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const update = (p) => {
    return updateCustomerProfile(p)
      .then(() => {
        getCustomerProfile().then(setProfile);
      });
  };
  const handleOnProfileSave = async () => {
    const p = {
      about: about.current.value,
      yelpingSince: yelpingSince.current.value,
      thingsILove: thingsILove.current.value,
      website: website.current.value,
    };
    await update(p);
    setEdit(!edit);
  };

  const handleOnProfileImageAdd = async (fileIds) => {
    update({ fileId: fileIds.files[0] });
  };

  const handleOnProfileImageDelete = async () => {
    update({ fileId: '' });
  };

  return (
    <div className="row">
      <div className="col-6">
        <ImageInput singleFile images={profile.fileId ? [profile.fileId] : []}
          onAdd={handleOnProfileImageAdd} onDelete={handleOnProfileImageDelete} />
        <div>
          <TextInput label="Name" edit={false} value={profile.name} />
          <TextInput label="Email" edit={false} value={profile.email} />
          <TextInput label="About" edit={edit} value={profile.about} ref={about} />
          <TextInput label="Yelping Since" edit={edit} value={profile.yelpingSince} ref={yelpingSince} />
          <TextInput label="Things I love" edit={edit} value={profile.thingsILove} ref={thingsILove} />
          <TextInput label="Website" edit={edit} value={profile.website} ref={website} />
        </div>
        <div className="d-flex justify-content-between">
          {edit
            ? (
              <>
                <button className="btn-outline-primary" onClick={toggleEdit}>Cancel</button>
                <button className="btn-primary" onClick={handleOnProfileSave}>Save</button>
              </>
            )
            : (<button className="btn-primary" onClick={toggleEdit}>Edit</button>)}
        </div>
      </div>
    </div>
  );
};

CustomerProfile.propTypes = {};

export default CustomerProfile;
