import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomerProfile from './CustomerProfile';
import CustomerDashboard from './CustomerDashboard';
import RestaurantView from './restaurant/View';
import MyOrders from './customer/MyOrders';
import { currentUser, myOrders } from '../util/fetch/api';
import { setCurrentUser, setMyOrders } from '../actions';

class CustomerHome extends Component {
  async componentDidMount() {
    this.props.setCurrentUser(await currentUser());
    this.props.setMyOrders(await myOrders());
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="navbar-brand text-light">Yelp!</div>
          <a className="nav-link text-light" href="#/customer/dashboard">Restaurants</a>
          <a className="nav-link text-light" href="#/customer/profile">My Profile</a>
          <a className="nav-link text-light" href="#/customer/myOrders">My Orders</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/customer/profile" exact>
            <CustomerProfile />
          </Route>
          <Route path="/customer/dashboard" exact>
            <CustomerDashboard />
          </Route>
          <Route path="/customer/myOrders" exact>
            <MyOrders />
          </Route>
          <Route path="/customer/restaurant/:id" exact>
            <RestaurantView />
          </Route>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = {
  setCurrentUser,
  setMyOrders,
};

CustomerHome.propTypes = {
  setCurrentUser: PropTypes.func,
  setMyOrders: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(CustomerHome);
