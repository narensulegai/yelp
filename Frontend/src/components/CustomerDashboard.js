import React, {Component} from 'react';
import * as ql from '../util/fetch/ql';
import Map from './Map';

class CustomerDashboard extends Component {
  constructor(props) {
    super(props);
    this.searchBox = React.createRef();
    this.state = {restaurants: [], filterBy: 'all'};
  }

  async componentDidMount() {
    const restaurants = await ql.getRestaurants();
    this.setState({restaurants});
  }

  handleOnSearch = async () => {
    const restaurants = await ql.getRestaurants(this.searchBox.current.value);
    this.setState({restaurants});
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-3">
          <div className="row">
            <div className="col-12 d-flex">
              <input type="text" className="flex-grow-1" placeholder="Search for a restaurant, dish etc" ref={this.searchBox}/>
              <button className="btn-primary" onClick={this.handleOnSearch}>Search</button>
            </div>
          </div>
        </div>
        <div className="col-6">
          {this.state.restaurants.length === 0 && <div>No restaurants to show</div>}
          {this.state.restaurants.map((r) => {
            return (
              <div key={r.id} className="card mb-3">
                <div className="card-header">
                  <h4>
                    <a href={`#/customer/restaurant/${r.id}`}>{r.name}</a>
                  </h4>
                  <div className="small">{r.description}</div>
                  <div className="small mt-2">
                    <div>Open {r.timings || '-'}</div>
                    <div>Located at {r.location || '-'}</div>
                  </div>
                  <div className="mt-3">
                    <h6>Menu</h6>
                    {r.dishes.length === 0 ? <div className="small">Not serving any thing yet</div> : null}
                    {r.dishes.map((d, i) => {
                      return <div className="small" key={i}><b>{d.name}</b>&nbsp;(${d.price})</div>
                    })}
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
