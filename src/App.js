import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route } from 'react-router-dom';
import Landing from './components/Landing';

class App extends Component {
  render() {
    return (
      <div className="container">
        <HashRouter>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/customerHome">
            <div>Customer home</div>
          </Route>
          <Route path="/restaurantHome">
            <div>Restaurant home</div>
          </Route>
          <Route path="/customerSignup">
            <div>Customer Signup</div>
          </Route>
          <Route path="/restaurantSignup">
            <div>Restaurant Signup</div>
          </Route>
        </HashRouter>
      </div>
    );
  }
}

App.propTypes = {};
export default App;
