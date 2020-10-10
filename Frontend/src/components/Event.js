import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, to12Hr } from '../util';

const Event = ({ event, onDelete }) => {
  return (
    <div className="card mt-2">
      <div className="card-header">
        {event.name}
      </div>
      <div className="card-body">
        <div>{event.description}</div>
        <h6>Hashtags {event.hashTags}</h6>
        <div><b>{event.customerEvents.length}</b> user(s) have registered</div>
        <div>{event.customerEvents.map((c) => {
          return (
            <a href={`#/restaurant/customer/${c.customer.id}`}
              key={c.customer.id}>{c.customer.name}</a>
          );
        })}
        </div>
        <div>
          Venue at <b>{event.location}</b>
          &nbsp;on <b>{formatDate(event.date)}</b>
          &nbsp;at <b>{to12Hr(event.time)}</b>
        </div>
      </div>
      <div className="card-footer">
        <button className="btn-primary" onClick={onDelete}>Delete event</button>
      </div>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.object,
  onDelete: PropTypes.func,
};

export default Event;
