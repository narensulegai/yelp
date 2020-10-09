import React, { Component } from 'react';
import { getCustomerEvents, getEvents, registerEvent } from '../../util/fetch/api';
import Event from './Event';
import { formatDate, to12Hr } from '../../util';

const ts = (d) => new Date(`${d.date} ${d.time}`).getTime();

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { allEvents: [], customerEvents: [] };
    this.search = React.createRef();
    this.handleOnRegister = this.handleOnRegister.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
  }

  async componentDidMount() {
    const allEvents = await getEvents();
    const customerEvents = await getCustomerEvents();
    this.setState({ allEvents, customerEvents });
  }

  async handleOnRegister(id) {
    await registerEvent(id);
    const allEvents = await getEvents();
    const customerEvents = await getCustomerEvents();
    this.setState({ allEvents, customerEvents });
  }

  handleOnSearch() {
    // console.log(this.search.current.value);
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <h4>All events</h4>
          <div className="d-flex">
            <input type="text" className="flex-grow-1" ref={this.search} placeholder="Search for an event" />
            <button className="btn-primary" onClick={this.handleOnSearch}>Search</button>
          </div>
          {this.state.allEvents.length === 0 && <div>There are no events to show</div>}
          {this.state.allEvents
            .sort((a, b) => {
              return ts(a) - ts(b);
            })
            .map((event) => {
              return (
                event
                  ? (
                    <Event event={event} key={event.id} onRegister={() => {
                      this.handleOnRegister(event.id);
                    }} />
                  )
                  : null
              );
            })}
        </div>
        <div className="col-6">
          <h4>Registered events</h4>
          {this.state.customerEvents.length === 0
            ? <div>You have not registered for any events</div>
            : null}
          {this.state.customerEvents.map((e, i) => {
            return (
              e.event ? (
                <div key={i} className="card mb-2">
                  <div className="card-header">
                    <div>Event <b>{e.event.name}</b></div>
                    <div>{e.event.description}</div>
                    <div>Venue at {e.event.location}
                      on {formatDate(e.event.date)}
                      at {to12Hr(e.event.time)}</div>
                  </div>
                </div>
              ) : null
            );
          })}
        </div>
      </div>
    );
  }
}

export default Events;
