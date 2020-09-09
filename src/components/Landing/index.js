import React, { PureComponent } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { get } from '../../util/fetch';
import LoginPage from '../LoginPage';

class Landing extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currTab: 'customer' };
    this.handleOnCustomerLogin = this.handleOnCustomerLogin.bind(this);
    this.handleOnRestaurantLogin = this.handleOnRestaurantLogin.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  handleOnCustomerLogin() {
    this.props.history.push('/customerHome');
  }

  handleOnRestaurantLogin() {
    this.props.history.push('/restaurantHome');
  }

  toggleLogin(currTab) {
    this.setState({ currTab });
  }

  async componentDidMount() {
    const currUser = await get('currentUser');
    if (currUser.scope !== null) {
      this.props.history.push(currUser.scope === 'customer' ? '/customerHome' : '/restaurantHome');
    }
  }

  render() {
    const { currTab } = this.state;
    return (
      <div>
        <div>
          {`Sign in as a ${currTab}`}
        </div>
        {currTab === 'customer'
        && (
        <div>
          <LoginPage onLogin={this.handleOnCustomerLogin} type={currTab} />
          <button onClick={() => { this.toggleLogin('restaurant'); }}>No, login as a restaurant owner</button>
        </div>
        )}
        {currTab === 'restaurant'
        && (
        <div>
          <LoginPage onLogin={this.handleOnRestaurantLogin} type={currTab} />
          <button onClick={() => { this.toggleLogin('customer'); }}>No, login as a customer</button>
        </div>
        )}
        <div>
          <NavLink to="/customerSignup">Sign up as a customer</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/restaurantSignup">Sign up as a restaurant</NavLink>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
