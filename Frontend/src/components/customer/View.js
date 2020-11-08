import React, {Component} from 'react';
import {fileUrl, getCustomer, follow, currentUser} from '../../util/fetch/api';
import Messenger from '../Messenger';

class View extends Component {
  constructor(props) {
    super(props);
    const id = window.location.hash.split('/').slice(-1)[0];
    this.state = {customer: null, customerId: id, current: {}};
  }

  async componentDidMount() {
    const customer = await getCustomer(this.state.customerId);
    const current = await currentUser();
    this.setState({customer, current});
  }

  handleOnFollow = async () => {
    await follow(this.state.customerId);
    const current = await currentUser();
    this.setState({current});
  }

  render() {
    return (
      this.state.customer && (
        <div className="row">
          <div className="col-6 text-center">
            <div className="mt-4">
              {this.state.customer.fileId
                ? <img src={fileUrl(this.state.customer.fileId)} className="profileImage" alt=""/>
                : 'No profile pic'}
            </div>
            <h4 className="mt-2">{this.state.customer.name}</h4>
            <div>Email <b>{this.state.customer.email}</b></div>
            <div>Yelping since <b>{this.state.customer.yelpingSince || '-'}</b></div>
            <div>Things I love <b>{this.state.customer.thingsILove || '-'}</b></div>
            <div>Website <b>{this.state.customer.website || '-'}</b></div>
            {this.state.current.scope === 'customer' && <div className="mt-2">
              <button className="btn-primary" onClick={this.handleOnFollow}>
                {(this.state.current.user.following &&
                  this.state.current.user.following.includes(this.state.customerId))
                  ? 'Following'
                  : 'Follow'}
              </button>
            </div>}
          </div>
          <div className="col-6">
            {this.state.current.scope === 'restaurant' &&
            <Messenger toUser={this.state.customer}/>}
          </div>
        </div>
      )
    );
  }
}

View.propTypes = {};

export default View;
