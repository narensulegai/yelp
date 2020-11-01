import React, {Component} from 'react';
import {getRestaurantEvents, createEvent, deleteEvent} from '../util/fetch/api';
import Event from './Event';
import NewEvent from './NewEvent';
import Paginate from "./Paginate";
import {slicePage} from "../util";

class RestaurantEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {events: [], currentPage: 0};
    this.handleOnEventAdd = this.handleOnEventAdd.bind(this);
    this.handleOnEventDelete = this.handleOnEventDelete.bind(this);
  }

  async componentDidMount() {
    const events = await getRestaurantEvents();
    this.setState({events});
  }

  async handleOnEventAdd(e) {
    createEvent(e)
      .then(async () => {
        const events = await getRestaurantEvents();
        this.setState({events});
      });
  }

  async handleOnEventDelete(id) {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteEvent(id);
      const events = await getRestaurantEvents();
      this.setState({events});
    }
  }

  handleOnPageChange = (currentPage) => {
    this.setState({currentPage})
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <NewEvent onAdd={this.handleOnEventAdd}/>
        </div>
        <div className="col-6">
          <h4>Your events</h4>
          {this.state.events.length === 0 ? <div>You have not added any events yet.</div> : null}
          {slicePage(this.state.events, this.state.currentPage).map((e) => {
            return (
              <Event key={e.id} event={e} onDelete={() => {
                this.handleOnEventDelete(e.id);
              }}/>
            );
          })}
          <Paginate currentPage={this.state.currentPage} numItems={this.state.events.length}
                    onPageChange={this.handleOnPageChange}/>
        </div>
      </div>
    );
  }
}

RestaurantEvents.propTypes = {};

export default RestaurantEvents;
