import React, { Component } from 'react';
import classNames from 'classnames';
import { Link, Route } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';
import CustomerDashboard from './CustomerDashboard';
import Events from './customer/Events';

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
        <div className="container">
          <Route path="/customer/profile">
            <CustomerProfile />
          </Route>
          <Route path="/customer/dashboard">
            <CustomerDashboard />
          </Route>
          <Route path="/customer/events">
            <Events />
          </Route>
        </div>
      </>
    );
  }
}

export default CustomerHome;
