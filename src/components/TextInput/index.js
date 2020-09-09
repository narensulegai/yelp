import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const TextInput = forwardRef(({ value }, ref) => {
  return (
    <>
      <input className="textInput" type="text" ref={ref} defaultValue={value} />
      <input className="disabledTextInput" type="text" defaultValue={value} disabled />
    </>
  );
});

TextInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default TextInput;
