import React from 'react';
import './App.css';
import { HashRouter, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './components/Signup';
import RestaurantHome from './components/RestaurantHome';
import CustomerHome from './components/CustomerHome';

function App() {
  return (
    <div>
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
      </HashRouter>
    </div>
  );
}

App.propTypes = {};
export default App;
