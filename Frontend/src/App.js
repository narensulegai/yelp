import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './components/Signup';
import RestaurantHome from './components/RestaurantHome';
import CustomerHome from './components/CustomerHome';
import Logout from './components/Logout';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/customer">
          <CustomerHome />
        </Route>
        <Route path="/restaurant">
          <RestaurantHome />
        </Route>
        <Route path="/customerSignup" exact>
          <Signup type="customer" />
        </Route>
        <Route path="/restaurantSignup" exact>
          <Signup type="restaurant" />
        </Route>
        <Route path="/logout" exact>
          <Logout />
        </Route>
      </Switch>
    </HashRouter>
  );
}

App.propTypes = {};
export default App;
