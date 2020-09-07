import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { post } from '../../util/fetch';

const Signup = (props) => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const handleSignUp = async () => {
    try {
      await post('signup/customer',
        {
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
        });
      props.history.push('/customerHome');
    } catch (e) {
      alert(e.err);
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
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

Signup.propTypes = {
  type: PropTypes.string,
};

export default withRouter(Signup);
