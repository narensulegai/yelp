import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRestaurantEvents, createEvent } from '../util/fetch/api';
import Event from './Event';
import NewEvent from './NewEvent';

class RestaurantEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
    this.handleOnEventAdd = this.handleOnEventAdd.bind(this);
  }

  async componentDidMount() {
    const events = await getRestaurantEvents();
    this.setState({ events });
  }

  async handleOnEventAdd(e) {
    createEvent(e)
      .then(async () => {
        const events = await getRestaurantEvents();
        this.setState({ events });
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col-4">
          <NewEvent onAdd={this.handleOnEventAdd} />
        </div>
        <div className="col-6">
          <h4>Your events</h4>
          {this.state.events.map((e, i) => {
            return <Event key={i} event={e} />;
          })}
        </div>
      </div>
    );
  }
}

RestaurantEvents.propTypes = {
};

export default RestaurantEvents;
