import React from 'react';
import PropTypes from 'prop-types';
import { isArray } from 'lodash';
import FileUpload from './FileUpload';
import { fileUrl } from '../util/fetch/api';

const ImageInput = ({
  images, onAdd, onDelete, singleFile,
}) => {
  const handleOnDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      onDelete(id);
    }
  };
  return (
    isArray(images)
      ? (
        <div className="imagesContainer d-flex align-items-center">
          {images.map((fileId) => {
            return (
              <div key={fileId} className="imageBox">
                <img src={fileUrl(fileId)} className="imageTile" />
                <div className="removeImageButton" onClick={() => {
                  handleOnDelete(fileId);
                }}>
                  Remove
                </div>
              </div>
            );
          })}
          <div>
            <span className="small mr-2 ml-2">Upload image</span>
            <FileUpload singleFile={singleFile} onUpload={onAdd} />
          </div>
        </div>
      )
      : null
  );
};

ImageInput.propTypes = {
  images: PropTypes.any,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  singleFile: PropTypes.bool,
};

export default ImageInput;
