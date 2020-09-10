import React from 'react';
import PropTypes from 'prop-types';
import FileUpload from '../FileUpload';

const ImageInput = ({
  images, onAdd, onDelete, singleFile,
}) => {
  const handleOnDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      onDelete(id);
    }
  };
  return (
    <div className="card-columns cardBlock">
      {images.map((img, i) => (
        <div key={i} className="form-group">
          <div>
            <img src={`/api/file/${img.fileId}`} alt={i} height={40} width={40} />
          </div>
          <div onClick={() => { handleOnDelete(img.id); }}>Remove</div>
        </div>
      ))}
      <div className="form-group">
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
