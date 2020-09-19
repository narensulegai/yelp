import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';
import CustomerDashboard from './CustomerDashboard';
import Events from './customer/Events';
import RestaurantView from "./restaurant/View";

class CustomerHome extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <div className="navbar-brand">Yelp</div>
          <a className="navbar-text" href="#/customer/dashboard">Dashboard</a>
          <a className="navbar-text" href="#/customer/profile">Profile</a>
          <a className="navbar-text" href="#/customer/events">Event</a>
          <a className="navbar-nav" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/customer/profile">
            <CustomerProfile />
          </Route>
          <Route path="/customer/dashboard">
            <CustomerDashboard />
          </Route>
          <Route path="/customer/events">
            <Events />
          </Route>
          <Route path="/customer/restaurant/:id">
            <RestaurantView />
          </Route>
        </div>
      </>
    );
  }
}

export default CustomerHome;
