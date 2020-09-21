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
          <div>{this.state.customer.email}</div>
        </div>
      </div>
    );
  }
}

View.propTypes = {};

export default View;
