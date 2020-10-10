import React from 'react';
import PropTypes from 'prop-types';
import { fileUrl } from '../util/fetch/api';

const Carousal = ({ images }) => {
  return (
    <div className="d-block mt-2">
      {images.map((img) => {
        return <img key={img.fileId} src={fileUrl(img.fileId)} className="multiImage" alt="Failed to load image" />;
      })}
    </div>
  );
};

Carousal.propTypes = {
  images: PropTypes.array,
};

export default Carousal;
