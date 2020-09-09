import React from 'react';
import PropTypes from 'prop-types';
import ImageInput from '../../ImageInput';

const RestaurantProfile = ({ images, onProfileImageAdd, onProfileImageDelete }) => {
  return (
    <div>
      <ImageInput images={images} onAdd={onProfileImageAdd} onDelete={onProfileImageDelete} />
    </div>
  );
};

RestaurantProfile.propTypes = {
  images: PropTypes.array,
  onProfileImageAdd: PropTypes.func,
  onProfileImageDelete: PropTypes.func,
};

export default RestaurantProfile;
