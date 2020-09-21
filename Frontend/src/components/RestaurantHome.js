import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import RestaurantProfile from './RestaurantProfile';
import Dishes from './Dishes';
import RestaurantEvents from './RestaurantEvents';
import Comment from './restaurant/Comment';
import Orders from './restaurant/Orders';
import CustomerView from './customer/View';

class RestaurantHome extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <div className="navbar-brand">Yelp</div>
          <a className="navbar-text" href="#/restaurant/profile">Profile</a>
          <a className="navbar-text" href="#/restaurant/dishes">Dishes</a>
          <a className="navbar-text" href="#/restaurant/events">Event</a>
          <a className="navbar-text" href="#/restaurant/comments">Comments</a>
          <a className="navbar-text" href="#/restaurant/orders">Orders</a>
          <a className="navbar-nav" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/restaurant/profile">
            <RestaurantProfile />
          </Route>
          <Route path="/restaurant/dishes">
            <Dishes />
          </Route>
          <Route path="/restaurant/events">
            <RestaurantEvents />
          </Route>
          <Route path="/restaurant/comments">
            <Comment />
          </Route>
          <Route path="/restaurant/orders">
            <Orders />
          </Route>
          <Route path="/restaurant/customer/:id">
            <CustomerView />
          </Route>
        </div>
      </>
    );
  }
}

export default RestaurantHome;
