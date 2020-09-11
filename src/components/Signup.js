import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { post } from '../util/fetch';
import TextInput from './TextInput';

const Signup = ({ type, history }) => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const location = useRef();

  const handleSignUp = () => {
    const d = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    if (type === 'customer') {
      post('signup/customer', d).then(() => {
        history.push('/customerHome');
      });
    } else {
      post('signup/restaurant', { ...d, ...{ location: location.current.value } }).then(() => {
        history.push('/restaurantHome');
      });
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-4" />
        <div className="col-4">
          <TextInput ref={name} label="Name" />
          <TextInput ref={email} label="Email" />
          <TextInput ref={password} label="Password" type="password" />
          {type === 'restaurant' && <TextInput ref={location} label="Location" />}
          <div className="form-group text-center">
            <button className="btn-primary" onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
        <div className="col-4" />
      </div>
    </div>
  );
};

Signup.propTypes = {
  type: PropTypes.string,
  history: PropTypes.any,
};

export default withRouter(Signup);
