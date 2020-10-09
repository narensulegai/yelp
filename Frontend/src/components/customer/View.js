import React, { Component } from 'react';
import { getCustomer } from '../../util/fetch/api';

class View extends Component {
  constructor(props) {
    super(props);
    const id = window.location.hash.split('/').slice(-1)[0];
    this.state = { customer: {}, customerId: parseInt(id) };
  }

  async componentDidMount() {
    const customer = await getCustomer(this.state.customerId);
    this.setState({ customer });
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <a href="#/restaurant/orders">Go back</a>
          <h4>{this.state.customer.name}</h4>
          <div>Email <b>{this.state.customer.email}</b></div>
          <div>Yelping since  <b>{this.state.customer.yelpingSince || '-'}</b></div>
          <div>Things I love <b>{this.state.customer.thingsILove || '-'}</b> </div>
          <div>Website <b>{this.state.customer.website || '-'}</b> </div>
        </div>
      </div>
    );
  }
}

View.propTypes = {};

export default View;
