import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';
import CustomerDashboard from './CustomerDashboard';
import Events from './customer/Events';
import RestaurantView from './restaurant/View';
import MyOrders from './customer/MyOrders';

class CustomerHome extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="navbar-brand text-light">Yelp</div>
          <a className="nav-link text-light" href="#/customer/dashboard">Dashboard</a>
          <a className="nav-link text-light" href="#/customer/profile">Profile</a>
          <a className="nav-link text-light" href="#/customer/events">Event</a>
          <a className="nav-link text-light" href="#/customer/myOrders">My Orders</a>
          <a className="text-light text-right" href="#/logout">Logout</a>
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
          <Route path="/customer/myOrders">
            <MyOrders />
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
