import React, { Component } from 'react';
import { addComment, getComments, getRestaurants } from '../../util/fetch/api';
import PlaceOrder from './PlacerOrder';

class View extends Component {
  constructor(props) {
    super(props);
    const id = window.location.hash.split('/').slice(-2)[0];
    this.state = {
      restaurant: {}, restaurantId: parseInt(id),
    };
    this.comment = React.createRef();
    this.rating = React.createRef();
  }

  async componentDidMount() {
    const restaurants = await getRestaurants();
    const restaurant = restaurants.filter((r) => {
      return r.id === this.state.restaurantId;
    })[0];
    this.setState({ restaurant });
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h2>{this.state.restaurant.name}</h2>
          <PlaceOrder restaurantId={this.state.restaurantId} />
        </div>
      </div>
    );
  }
}

View.propTypes = {};

export default View;
