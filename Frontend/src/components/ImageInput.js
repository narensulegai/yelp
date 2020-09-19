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
        <div key={i} className="imageBox mr-2">
          <img src={`/api/file/${img.fileId}`} alt="Reload page" className="imageTile" />
          <div className="removeImageButton" onClick={() => {
            handleOnDelete(img.id);
          }}>
            Remove
          </div>
        </div>
      ))}
      <FileUpload singleFile={singleFile} onUpload={onAdd} />
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
