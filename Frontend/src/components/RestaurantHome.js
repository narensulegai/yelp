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
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="navbar-brand text-light">Yelp!</div>
          <a className="nav-link text-light" href="#/restaurant/profile">Profile</a>
          <a className="nav-link text-light" href="#/restaurant/dishes">Dishes</a>
          <a className="nav-link text-light" href="#/restaurant/events">Event</a>
          <a className="nav-link text-light" href="#/restaurant/comments">Comments</a>
          <a className="nav-link text-light" href="#/restaurant/orders">Orders</a>
          <a className="nav-link" href="#/logout">Logout</a>
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
