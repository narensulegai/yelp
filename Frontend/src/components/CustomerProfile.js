import React, { useEffect, useRef, useState } from 'react';
import ImageInput from './ImageInput';
import TextInput from './TextInput';
import {
  addImages, deleteImage, getCustomerProfile, getImages, updateCustomerProfile,
} from '../util/fetch/api';

const CustomerProfile = () => {
  const name = useRef();
  const about = useRef();
  const yelpingSince = useRef();
  const thingsILove = useRef();
  const website = useRef();
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState({});
  const [images, setImages] = useState([]);

  const getCustImages = async () => {
    const img = await getImages();
    return img.filter((i) => i.type === 'profile');
  };

  useEffect(() => {
    getCustomerProfile().then(setProfile);
    getCustImages().then(setImages);
  }, []);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleOnProfileSave = () => {
    const p = {
      name: name.current.value,
      about: about.current.value,
      yelpingSince: yelpingSince.current.value,
      thingsILove: thingsILove.current.value,
      website: website.current.value,
    };
    updateCustomerProfile(p)
      .then(() => {
        getCustomerProfile().then(setProfile);
        setEdit(!edit);
      });
  };

  const handleOnProfileImageAdd = async (fileIds) => {
    // Delete the current image first
    if (images.length) {
      await deleteImage(images[0].id);
    }
    await addImages({ fileIds: fileIds.files, type: 'profile', typeId: null });
    setImages(await getCustImages());
  };

  const handleOnProfileImageDelete = async (id) => {
    await deleteImage(id);
    setImages(await getCustImages());
  };

  return (
    <div className="row">
      <div className="col-12">
        <ImageInput singleFile images={images}
          onAdd={handleOnProfileImageAdd} onDelete={handleOnProfileImageDelete} />
        <div>
          <TextInput label="Name" edit={edit} value={profile.name} ref={name} />
          <TextInput label="About" edit={edit} value={profile.about} ref={about} />
          <TextInput label="Yelping Since" edit={edit} value={profile.yelpingSince} ref={yelpingSince} />
          <TextInput label="Things I love" edit={edit} value={profile.thingsILove} ref={thingsILove} />
          <TextInput label="Website" edit={edit} value={profile.website} ref={website} />
        </div>

      </div>
      <div className="col-12 d-flex justify-content-between">
        {edit
          ? (
            <>
              <button className="btn btn-outline-primary" onClick={toggleEdit}>Cancel</button>
              <button className="btn btn-primary" onClick={handleOnProfileSave}>Save</button>
            </>
          )
          : (<button className="btn btn-primary" onClick={toggleEdit}>Edit</button>)}
      </div>
    </div>
  );
};

CustomerProfile.propTypes = {};

export default CustomerProfile;
