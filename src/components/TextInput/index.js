import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const TextInput = forwardRef(({ value, label, edit }, ref) => {
  return (
    <div className="form-group">
      <label className="font-weight-bold">{label}</label>
      {edit
        ? (
          <input type="text" placeholder={label}
            className="form-control" defaultValue={value} ref={ref} />
        )
        : <div className="">{value}</div>}
    </div>
  );
});

TextInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  edit: PropTypes.bool,
};

export default TextInput;
