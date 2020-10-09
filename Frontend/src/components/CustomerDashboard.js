import React, {Component} from 'react';
import {getRestaurants} from '../util/fetch/api';
import Map from './Map';

class CustomerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {restaurants: [], filterBy: 'all'};
  }

  async componentDidMount() {
    const restaurants = await getRestaurants();
    this.setState({restaurants});
  }

  handleOnFilterChange = async (e) => {
    const filterBy = e.target.value
    const allRestaurants = await getRestaurants();

    const restaurants = allRestaurants.filter(r => {
      if (filterBy === 'all') return true;
      if (filterBy === 'pickup') return r.isPickup;
      if (filterBy === 'delivery') return !r.isPickup;
      return true;
    });

    this.setState({restaurants});
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-3">
          <div className="row">
            <div className="col-6 d-flex">
              <input type="text" className="flex-grow-1" placeholder="Search for a restaurant"/>
              <button className="btn-primary">Search</button>
            </div>
            <div className="col-6">
              <span className="mr-3">Filter by delivery option</span>
              <select defaultValue="all" onChange={this.handleOnFilterChange}>
                <option value="all">Any</option>
                <option value="pickup">Pick up only</option>
                <option value="delivery">Yelp delivery only</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-6">
          {this.state.restaurants.length === 0 && <div>No restaurants to show</div>}
          {this.state.restaurants.map((r, i) => {
            return (
              <div key={i} className="card mb-3">
                <div className="card-header">
                  <h4>
                    <a href={`#/customer/restaurant/${r.id}/comments`}>{r.name}</a>
                  </h4>
                  <div>
                    <span>Timings {r.timings || '-'}</span>
                    &nbsp;|&nbsp;
                    <span>Location {r.location || '-'}</span>
                  </div>
                  <div>
                    Delivery by <b>{r.isPickup ? 'Pickup' : 'Yelp Delivery'}</b>
                  </div>
                  <div>
                    <a href={`#/customer/restaurant/${r.id}/comments`}>Reviews</a>
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
            ? <Map locations={this.state.restaurants.map((r) => r.location)}/>
            : <div>No restaurants show on map</div>}
        </div>
      </div>
    );
  }
}

CustomerDashboard.propTypes = {};

export default CustomerDashboard;
