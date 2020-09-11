import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { logout } from '../../util/fetch/api';

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    logout()
      .then(() => {
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <div className="text-center">Logging out</div>
    );
  }
}

export default withRouter(Logout);
