import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { post } from '../../util/fetch';

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
    <div>
      <div>
        <input type="text" ref={name} placeholder="Name" />
      </div>
      <div>
        <input type="text" ref={email} placeholder="Email" />
      </div>
      <div>
        <input type="password" ref={password} placeholder="Password" />
      </div>
      <div>
        {type === 'restaurant' && <input type="text" ref={location} placeholder="Location" />}
      </div>
      <div>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

Signup.propTypes = {
  type: PropTypes.string,
  history: PropTypes.any,
};

export default withRouter(Signup);
