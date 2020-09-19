import React, { Component } from 'react';
import { getRestaurants } from '../util/fetch/api';

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
        <div className="col-12">
          <div className="d-flex">
            <input type="text" className="flex-grow-1" />
            <button className="btn-primary">Search</button>
          </div>
          {this.state.restaurants.map((r, i) => {
            return (
              <div key={i} className="card mt-3">
                <div className="card-header">
                  <h4>
                    <a href={`#/customer/restaurant/${r.id}`}>{r.name}</a>
                  </h4>
                  <div>{r.timings}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

CustomerDashboard.propTypes = {};

export default CustomerDashboard;
