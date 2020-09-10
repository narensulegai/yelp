import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const TextInput = forwardRef(({
  value, label, edit, type,
}, ref) => {
  return (
    <div className="form-group">
      <label className="font-weight-bold">{label}</label>
      {edit
        ? (
          <input type={type} placeholder={label}
            className="form-control" defaultValue={value} ref={ref} />
        )
        : <div className="">{value}</div>}
    </div>
  );
});

TextInput.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  edit: PropTypes.bool,
};
TextInput.defaultProps = {
  type: 'text',
  edit: true,
  value: '',
};
export default TextInput;
