import React, {PureComponent} from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import LoginPage from './LoginPage';
import {currentUser} from "../util/fetch/api";

export class Landing extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {currTab: 'customer'};
  }

  async componentDidMount() {
    const currUser = await currentUser();
    //Redirect logged in users automatically
    if (currUser.scope !== null) {
      this.props.history.push(currUser.scope === 'customer' ? '/customer/dashboard' : '/restaurant/profile');
    }
  }

  handleOnLogin = async () => {
    //Redirect user after login
    this.props.history.push(this.state.currTab === 'customer' ? '/customer/dashboard' : '/restaurant/profile');
  }

  toggleLogin = () => {
    if (this.state.currTab === 'customer') {
      this.setState({currTab: 'restaurant'});
    } else {
      this.setState({currTab: 'customer'});
    }
  }

  render() {
    const {currTab} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-3"/>
          <div className="col-6">
            <div className="h3 text-center mt-3">Yelp!</div>
            <div className="text-center">{`Sign in as a ${currTab}`}</div>
            <LoginPage onLogin={this.handleOnLogin} type={currTab}/>

            <div className="d-flex justify-content-center">
              <div>Dont have a account ?&nbsp;&nbsp;</div>
              <NavLink to="/customerSignup">Sign up as a customer</NavLink>
              <div>&nbsp;or&nbsp;</div>
              <NavLink to="/restaurantSignup">Sign up as a restaurant</NavLink>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-outline-primary" onClick={this.toggleLogin}>
                {currTab === 'restaurant'
                  ? 'No, login as customer'
                  : 'No, login as a restaurant owner'}
              </button>
            </div>
          </div>
          <div className="col-3"/>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
