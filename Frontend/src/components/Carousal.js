import React from 'react';
import PropTypes from 'prop-types';
import { fileUrl } from '../util/fetch/api';

const Carousal = ({ images }) => {
  return (
    <div className="d-block mt-2">
      {images.map((fileId) => {
        return <img key={fileId} src={fileUrl(fileId)} className="multiImage" alt="" />;
      })}
    </div>
  );
};

Carousal.propTypes = {
  images: PropTypes.array,
};

export default Carousal;
