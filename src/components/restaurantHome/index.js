import React, { Component } from 'react';
import { currentUser } from '../../util/fetch/api';
import RestaurantProfile from './RestaurantProfile';

class RestaurantHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const curr = await currentUser();
    console.log(curr);
  }

  render() {
    return (
      <div>
        <RestaurantProfile />
      </div>
    );
  }
}

export default RestaurantHome;
