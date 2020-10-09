import React, { Component } from 'react';
import { getRestaurants } from '../util/fetch/api';
import Map from './Map';

class CustomerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: [] };
  }

  async componentDidMount() {
    const restaurants = await getRestaurants();
    this.setState({ restaurants });
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <div className="d-flex">
            <input type="text" className="flex-grow-1" />
            <button className="btn-primary">Search</button>
          </div>
        </div>
        <div className="col-6">
          {this.state.restaurants.length === 0 && <div>No restaurants to show</div>}
          {this.state.restaurants.map((r, i) => {
            return (
              <div key={i} className="card mb-3">
                <div className="card-header">
                  <h6>
                    <a href={`#/customer/restaurant/${r.id}/comments`}>{r.name}</a>
                  </h6>
                  <div>
                    <span>Timings {r.timings || '-'}</span>
                    &nbsp;|&nbsp;
                    <span>Location {r.location}</span>
                  </div>
                  <div>
                    Delivery Mode {r.isPickup ? 'Pickup' : 'Yelp Delivery'}
                  </div>
                  <div>
                    <a href={`#/customer/restaurant/${r.id}/comments`}>Comments</a>
                    &nbsp;|&nbsp;
                    <a href={`#/customer/restaurant/${r.id}/placeOrder`}>Place Order</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-6">
          {this.state.restaurants.length
            ? <Map locations={this.state.restaurants.map((r) => r.location)} />
            : <div>No restaurants show on map</div>}
        </div>
      </div>
    );
  }
}

CustomerDashboard.propTypes = {};

export default CustomerDashboard;
