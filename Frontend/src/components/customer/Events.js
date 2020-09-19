import React, { Component } from 'react';
import { getEvents } from '../../util/fetch/api';
import Event from './Event';

class Events extends Component {

  state = { events: [] }

  async componentDidMount() {
    const events = await getEvents();
    this.setState({ events });
  }

  handleOnRegister = (id) =>{
    console.log(id);
  }

  render() {
    return (
      <div className="row">
        <div className="col-4">
          <h4>All events</h4>
          {this.state.events.map((event, i) => {
            return (
              <Event event={event} key={i}
                onRegister={() => { this.handleOnRegister(event.id); }} />
            );
          })}
        </div>
        <div className="col-4">
          <h4>Registered events</h4>
          {this.state.events.map((event, i) => {
            return (
              <Event event={event} key={i}
                onRegister={() => { this.handleOnRegister(event.id); }} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Events;
