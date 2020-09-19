import React, { useEffect, useRef, useState } from 'react';
import ImageInput from './ImageInput';
import TextInput from './TextInput';
import {
  addImages, deleteImage, getImages, getRestaurantProfile, updateRestaurantProfile,
} from '../util/fetch/api';

const RestaurantProfile = () => {
  const name = useRef();
  const location = useRef();
  const description = useRef();
  const contactInformation = useRef();
  const timings = useRef();
  const [edit, setEdit] = useState(false);
  const [images, setImages] = useState([]);
  const [profile, setProfile] = useState({});

  const toggleEdit = () => {
    setEdit(!edit);
  };
  const getProfileImages = async () => {
    const img = await getImages();
    return img.filter((i) => i.type === 'profile');
  };
  useEffect(() => {
    (async () => {
      setImages(await getProfileImages());
      setProfile(await getRestaurantProfile());
    })();
  }, []);

  const handleOnProfileSave = async () => {
    const p = {
      name: name.current.value,
      location: location.current.value,
      description: description.current.value,
      contactInformation: contactInformation.current.value,
      timings: timings.current.value,
    };
    updateRestaurantProfile(p)
      .then(async () => {
        setProfile(await getRestaurantProfile());
        setEdit(!edit);
      });
  };

  const handleOnProfileImageAdd = async (fileIds) => {
    await addImages({ fileIds: fileIds.files, type: 'profile', typeId: null });
    setImages(await getProfileImages());
  };

  const handleOnProfileImageDelete = async (id) => {
    await deleteImage(id);
    setImages(await getProfileImages());
  };

  return (
    <div className="row">
      <div className="col-8">
        <ImageInput images={images}
          onAdd={handleOnProfileImageAdd}
          onDelete={handleOnProfileImageDelete} />
        <TextInput label="Name" edit={edit} value={profile.name} ref={name} />
        <TextInput label="Location" edit={edit} value={profile.location} ref={location} />
        <TextInput label="Description" edit={edit} value={profile.description} ref={description} />
        <TextInput label="Contact information" edit={edit} value={profile.contactInformation} ref={contactInformation} />
        <TextInput label="Timings" edit={edit} value={profile.timings} ref={timings} />
      </div>
      <div className="col-8 d-flex justify-content-between">
        {edit
          ? (
            <>
              <button className="btn btn-outline-primary" onClick={toggleEdit}>Cancel</button>
              <button className="btn btn-primary" onClick={handleOnProfileSave}>Save</button>
            </>
          )
          : <button className="btn btn-primary" onClick={toggleEdit}>Edit</button>}
      </div>
    </div>
  );
};

RestaurantProfile.propTypes = {
};

export default RestaurantProfile;
