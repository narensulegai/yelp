import React, { Component } from 'react';
import { fileUrl, getCustomer } from '../../util/fetch/api';
import Messenger from '../Messenger';

class View extends Component {
  constructor(props) {
    super(props);
    const id = window.location.hash.split('/').slice(-1)[0];
    this.state = { customer: null, customerId: id };
  }

  async componentDidMount() {
    const customer = await getCustomer(this.state.customerId);
    this.setState({ customer });
  }

  render() {
    return (
      this.state.customer && (
        <div className="row">
          <div className="col-6 text-center">
            <div className="mt-4">
              {this.state.customer.fileId
                ? <img src={fileUrl(this.state.customer.fileId)} className="profileImage" alt="" />
                : 'No profile pic'}
            </div>
            <h4 className="mt-2">{this.state.customer.name}</h4>
            <div>Email <b>{this.state.customer.email}</b></div>
            <div>Yelping since <b>{this.state.customer.yelpingSince || '-'}</b></div>
            <div>Things I love <b>{this.state.customer.thingsILove || '-'}</b></div>
            <div>Website <b>{this.state.customer.website || '-'}</b></div>
          </div>
          <div className="col-6">
            <Messenger toUser={this.state.customer} scope="customer" />
          </div>
        </div>
      )
    );
  }
}

View.propTypes = {};

export default View;
