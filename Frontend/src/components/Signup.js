import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ql from '../util/fetch/ql';

const Signup = ({ type, history }) => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const location = useRef();

  const handleSignUp = async () => {
    const d = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    if (type === 'customer') {
      await ql.signUpCustomer(d);
      history.push('/customer/dashboard');
    } else {
      await ql.signUpRestaurant({ ...d, location: location.current.value });
      history.push('/restaurant/profile');
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-4" />
        <div className="col-4">
          <h2 className="text-center mt-5">Yelp!</h2>
          <div className="form-group mt-5">
            <input type="text" ref={name} placeholder="Name" className="form-control" />
          </div>
          <div className="form-group">
            <input type="text" ref={email} placeholder="Email" className="form-control" />
          </div>
          <div className="form-group">
            <input type="password" ref={password} placeholder="Password" className="form-control" />
          </div>
          {type === 'restaurant'
            ? (
              <div className="form-group">
                <input type="text" ref={location} placeholder="Location" className="form-control" />
              </div>
            )
            : null}
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
