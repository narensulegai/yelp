import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { get } from '../../util/fetch';
import LoginPage from '../LoginPage';

class Landing extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currTab: 'customer' };
    this.handleOnCustomerLogin = this.handleOnCustomerLogin.bind(this);
    this.handleOnRestaurantLogin = this.handleOnRestaurantLogin.bind(this);
  }

  handleOnCustomerLogin() {

  }

  handleOnRestaurantLogin() {

  }

  async componentDidMount() {
    const currUser = await get('currentUser');
    if (currUser.scope === 'customer') {
      this.props.history.push('/customerHome');
    }
    if (currUser.scope === 'customer') {
      this.props.history.push('/restaurantHome');
    }
  }

  render() {
    const { currTab } = this.state;
    return (
      <div>
        <div>Sign up</div>
        {currTab === 'customer' && <LoginPage onLogin={this.handleOnCustomerLogin} type={currTab} />}
        {currTab === 'restaurant' && <LoginPage onLogin={this.handleOnRestaurantLogin} type={currTab} />}
      </div>
    );
  }
}

export default withRouter(Landing);
