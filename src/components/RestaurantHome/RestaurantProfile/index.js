import React from 'react';
import PropTypes from 'prop-types';
import FileUpload from '../../FileUpload';

const RestaurantProfile = ({}) => {
  const handleOnUpload = (d) => {
    console.log(d);
  };
  return (
    <div>
      <div>
        <img src="" alt="Profile" />
      </div>
      <FileUpload singleFile onUpload={handleOnUpload} />
    </div>
  );
};

RestaurantProfile.propTypes = {

};

export default RestaurantProfile;
