import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';
import CustomerDashboard from './CustomerDashboard';
import Events from './customer/Events';
import RestaurantView from './restaurant/View';
import CustomerView from './customer/View';
import MyOrders from './customer/MyOrders';
import Messages from './customer/Messages';
import Users from './Users';

class CustomerHome extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="navbar-brand text-light">Yelp!</div>
          <a className="nav-link text-light" href="#/customer/dashboard">Restaurants</a>
          <a className="nav-link text-light" href="#/customer/profile">My Profile</a>
          <a className="nav-link text-light" href="#/customer/events">Event</a>
          <a className="nav-link text-light" href="#/customer/myOrders">My Orders</a>
          <a className="nav-link text-light" href="#/customer/messages">My Messages</a>
          <a className="nav-link text-light" href="#/customer/users">Users</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/customer/profile" exact>
            <CustomerProfile />
          </Route>
          <Route path="/customer/dashboard" exact>
            <CustomerDashboard />
          </Route>
          <Route path="/customer/events" exact>
            <Events />
          </Route>
          <Route path="/customer/myOrders" exact>
            <MyOrders />
          </Route>
          <Route path="/customer/messages" exact>
            <Messages />
          </Route>
          <Route path="/customer/users" exact>
            <Users />
          </Route>
          <Route path="/customer/user/:id" exact>
            <CustomerView />
          </Route>
          <Route path="/customer/restaurant/:id" exact>
            <RestaurantView />
          </Route>
        </div>
      </>
    );
  }
}

export default CustomerHome;
