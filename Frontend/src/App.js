import React from 'react';
import './App.css';
import { HashRouter, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './components/Signup';
import RestaurantHome from './components/RestaurantHome';
import CustomerHome from './components/CustomerHome';
import Logout from './components/Logout';

function App() {
  return (
    <HashRouter>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/customerHome">
        <CustomerHome />
      </Route>
      <Route path="/restaurantHome">
        <RestaurantHome />
      </Route>
      <Route path="/customerSignup">
        <Signup type="customer" />
      </Route>
      <Route path="/restaurantSignup">
        <Signup type="restaurant" />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
    </HashRouter>
  );
}

App.propTypes = {};
export default App;
