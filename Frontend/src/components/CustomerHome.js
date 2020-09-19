import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';
import CustomerDashboard from './CustomerDashboard';
import Events from './customer/Events';

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: 'events' };
  }

  render() {
    const {
      currentTab,
    } = this.state;
    return (
      <div className="container-fluid">
        <nav className="navbar clearfix">
          <Link to="/logout">Logout</Link>
        </nav>
        <div className="row">

          <div className="col-2">
            <button
              className={classNames({ 'font-weight-bold': currentTab === 'dashboard', 'btn btn-link d-block': true })}
              onClick={() => this.setState({ currentTab: 'dashboard' })}>
              Dashboard
            </button>
            <button className={classNames({ 'font-weight-bold': currentTab === 'profile', 'btn btn-link d-block': true })}
              onClick={() => this.setState({ currentTab: 'profile' })}>
              Profile
            </button>
            <button className={classNames({ 'font-weight-bold': currentTab === 'events', 'btn btn-link d-block': true })}
              onClick={() => this.setState({ currentTab: 'events' })}>
              Events
            </button>
          </div>

          <div className="col-10">

            {currentTab === 'profile' && (
              <CustomerProfile />
            )}

            {currentTab === 'dashboard' && (
              <CustomerDashboard />
            )}

            {currentTab === 'events' && (
              <Events />
            )}

          </div>
        </div>
      </div>
    );
  }
}

export default CustomerHome;
