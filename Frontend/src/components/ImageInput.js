import React from 'react';
import PropTypes from 'prop-types';
import FileUpload from './FileUpload';

const ImageInput = ({
  images, onAdd, onDelete, singleFile,
}) => {
  const handleOnDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      onDelete(id);
    }
  };
  return (
    <div className="imagesContainer d-flex align-items-center">
      {images.map((img, i) => (
        <div key={i} className="imageBox">
          <img src={`/api/file/${img.fileId}`} className="imageTile" />
          <div className="removeImageButton" onClick={() => {
            handleOnDelete(img.id);
          }}>
            Remove
          </div>
        </div>
      ))}
      <div>
        <span className="small mr-2 ml-2">Upload image</span>
        <FileUpload singleFile={singleFile} onUpload={onAdd} />
      </div>
    </div>
  );
};

ImageInput.propTypes = {
  images: PropTypes.array,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  singleFile: PropTypes.bool,
};

export default ImageInput;
