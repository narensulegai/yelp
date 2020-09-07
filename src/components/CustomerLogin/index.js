import React, { createRef } from 'react';
import PropTypes from 'prop-types';

const CustomerLogin = (props) => {
  const name = createRef();
  const email = createRef();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <span>Name</span>
        {' '}
        <input type="text" placeholder="john doe" ref={name} />
        <span>Email</span>
        {' '}
        <input type="text" placeholder="john@gmail.com" ref={email} />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

CustomerLogin.propTypes = {

};

export default CustomerLogin;
