import React, {Component} from 'react';
import {getCustomerEvents, getEvents, registerEvent} from '../../util/fetch/api';
import Event from './Event';

class Events extends Component {

  state = {allEvents: [], customerEvents: []}

  async componentDidMount() {
    const allEvents = await getEvents();
    const customerEvents = await getCustomerEvents();
    this.setState({allEvents, customerEvents});
  }

  handleOnRegister = async (id) => {
    await registerEvent(id)
    const allEvents = await getEvents();
    const customerEvents = await getCustomerEvents();
    this.setState({allEvents, customerEvents});
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <h4>All events</h4>
          {this.state.allEvents.length === 0 && <div>There are no events to show</div>}
          {this.state.allEvents.map((event) => {
            return (
              event ? <Event event={event} key={event.id}
                             onRegister={() => {
                               this.handleOnRegister(event.id);
                             }}/> : null
            );
          })}
        </div>
        <div className="col-6">
          <h4>Registered events</h4>
          {this.state.customerEvents.length === 0 && <div>You have not registered for any events</div>}
          {this.state.customerEvents.map((e, i) => {
            return (
              e.event ? <div key={i} className="card mb-2">
                <div className="card-header">
                  <h4>Event <b>{e.event.name}</b></h4>
                  <div>{e.event.description}</div>
                </div>
              </div> : null
            );
          })}
        </div>
      </div>
    );
  }
}

export default Events;
