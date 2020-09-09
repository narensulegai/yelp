import React from 'react';
import PropTypes from 'prop-types';

const FileUpload = ({ singleFile, onUpload }) => {
  const handleOnChange = (e) => {
    const { files } = e.target;
    const data = new FormData();

    for (const file of files) {
      data.append('files', file, file.name);
    }
    fetch('/api/uploadFile', {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then(onUpload);
  };
  return (
    singleFile
      ? <input type="file" onChange={handleOnChange} />
      : <input type="file" multiple onChange={handleOnChange} />
  );
};

FileUpload.propTypes = {
  onUpload: PropTypes.func,
  singleFile: PropTypes.bool,
};

export default FileUpload;
