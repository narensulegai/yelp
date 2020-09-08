import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { put } from '../../util/fetch';

const LoginPage = (props) => {
  const email = createRef();
  const password = createRef();
  const handleOnSubmit = () => {
    put('login/customer', {
      email: email.current.value,
      password: password.current.value,
    }).then((user) => {
      props.onLogin(user);
    });
  };

  return (
    <div className="row">
      <div className="col-12">
        <div>
          <input type="text" placeholder="Email" ref={email} />
        </div>
        <div>
          <input type="text" placeholder="Password" ref={password} />
        </div>
        <div>
          <button onClick={handleOnSubmit}>Sign in</button>
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func,
  type: PropTypes.string,
};

export default LoginPage;
