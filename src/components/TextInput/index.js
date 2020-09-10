import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const TextInput = forwardRef(({ value, edit }, ref) => {
  return (
    <>
      {edit && <input type="text" defaultValue={value} ref={ref} />}
      {!edit && <span>{value}</span>}
    </>
  );
});

TextInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  edit: PropTypes.bool,
};

export default TextInput;
