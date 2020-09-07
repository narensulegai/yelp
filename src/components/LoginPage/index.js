import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { put } from '../../util/fetch';

const CustomerLogin = (props) => {
  const email = createRef();
  const password = createRef();
  const [msg, setMsg] = useState(null);
  const handleOnSubmit = async () => {
    setMsg(null);
    try {
      const user = await put('login/customer', {
        email: email.current.value,
        password: password.current.value,
      });
      props.onLogin(user);
    } catch (e) {
      setMsg(e.err);
    }
  };

  return (
    <div className="row">
      <div className="col-6">
        <div>{msg}</div>
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

CustomerLogin.propTypes = {
  onLogin: PropTypes.func,
};

export default CustomerLogin;
