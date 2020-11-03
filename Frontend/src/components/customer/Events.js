import React, {Component} from 'react';
import {
  getCustomerEvents, getEvents, registerEvent, searchEvents,
} from '../../util/fetch/api';
import Event from './Event';
import {formatDate, to12Hr} from '../../util';

const ts = (d) => new Date(`${d.date} ${d.time}`).getTime();

class Events extends Component {

  constructor(props) {
    super(props);
    this.state = {allEvents: [], customerEvents: []};
    this.searchTextBox = React.createRef();
    this.orderSelectBox = React.createRef();
  }

  async componentDidMount() {
    await this.loadEvents();
  }

  handleOnRegister = async (id) => {
    await registerEvent(id);
    await this.loadEvents();
  }

  loadEvents = async () => {
    const search = this.searchTextBox.current.value;
    const allEvents = await getEvents(search);
    const customerEvents = await getCustomerEvents(search);
    this.setState({allEvents, customerEvents});
  }

  handleOnSearch = async () => {
    await this.loadEvents();
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <h4>All events</h4>
          <div className="d-flex">
            <input type="text" className="flex-grow-1" ref={this.searchTextBox} placeholder="Search for an event"/>
            <select defaultValue='asce' ref={this.orderSelectBox}>
              <option value="asce">Most recent first</option>
              <option value="dese">Most recent last</option>
            </select>
            <button className="btn-primary" onClick={this.handleOnSearch}>Search</button>
          </div>
          {this.state.allEvents.length === 0 && <div>There are no events to show</div>}
          {this.state.allEvents
            .sort((a, b) => {
              const order = this.orderSelectBox.current.value;
              return order === 'asce' ? ts(a) - ts(b) : ts(b) - ts(a)
            })
            .map((event) => {
              return (
                event
                  ? (
                    <Event event={event} key={event.id} onRegister={() => {
                      this.handleOnRegister(event.id);
                    }}/>
                  )
                  : null
              );
            })}
        </div>
        <div className="col-6">
          <h4>Registered events</h4>
          {this.state.customerEvents.length === 0
            ? <div>You have not registered for any events yet.</div>
            : null}
          {this.state.customerEvents.map((event) => {
            return (
              event ? (
                <div key={event.id} className="card mb-2">
                  <div className="card-header">
                    <div><b>{event.name}</b></div>
                    <div className="small mt-2">{event.description}</div>
                    <div className="small">
                      Venue <b>{event.location}</b>&nbsp;
                      on <b>{formatDate(event.date)}</b>&nbsp;
                      at <b>{to12Hr(event.time)}</b>
                    </div>
                    <div className="small mt-2">Your registered on {formatDate(event.createdAt)}</div>
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
