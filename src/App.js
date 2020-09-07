import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Route path="/" component={Landing} />
          {/*<Route path="/customerHome" component={<div>Customer home</div>} />*/}
          {/*<Route path="/restaurantHome" component={<div>Restaurant home</div>} />*/}
        </Router>
      </div>
    );
  }
}

App.propTypes = {};
export default App;
