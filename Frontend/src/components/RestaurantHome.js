import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RestaurantProfile from './RestaurantProfile';
import Dishes from './Dishes';
import RestaurantEvents from './RestaurantEvents';
import Comment from './restaurant/Comment';
import Orders from './restaurant/Orders';
import CustomerView from './customer/View';
import { currentUser, myOrders } from '../util/fetch/api';
import { setCurrentUser, setMyOrders } from '../actions';

class RestaurantHome extends Component {
  async componentDidMount() {
    this.props.setCurrentUser(await currentUser());
    this.props.setMyOrders(await myOrders());
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="navbar-brand text-light">Yelp!</div>
          <a className="nav-link text-light" href="#/restaurant/profile">Profile</a>
          <a className="nav-link text-light" href="#/restaurant/dishes">Dishes</a>
          <a className="nav-link text-light" href="#/restaurant/events">Event</a>
          <a className="nav-link text-light" href="#/restaurant/comments">Reviews</a>
          <a className="nav-link text-light" href="#/restaurant/orders">Orders</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/restaurant/profile" exact>
            <RestaurantProfile />
          </Route>
          <Route path="/restaurant/dishes" exact>
            <Dishes />
          </Route>
          <Route path="/restaurant/events" exact>
            <RestaurantEvents />
          </Route>
          <Route path="/restaurant/comments" exact>
            <Comment />
          </Route>
          <Route path="/restaurant/orders" exact>
            <Orders />
          </Route>
          <Route path="/restaurant/customer/:id" exact>
            <CustomerView />
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

RestaurantHome.propTypes = {
  setCurrentUser: PropTypes.func,
  setMyOrders: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(RestaurantHome);
