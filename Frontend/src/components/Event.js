import React from 'react';
import PropTypes from 'prop-types';

const Event = ({ event, onDelete }) => {
  return (
    <div className="card mt-2">
      <div className="card-header">
        {event.name}
      </div>
      <div className="card-body">
        <p>{event.description}</p>
        <h6>Hashtags {event.hashTags}</h6>
        <div>Registered users ({event.customerEvents.length})</div>
        <div>{event.customerEvents.map((c) => {
          return (
            <a href={`#/restaurant/customer/${c.customer.id}`}
              key={c.customer.id}>{c.customer.name}</a>
          );
        })}
        </div>
        <div>Venue at {event.location} on {event.date} at {event.time}</div>
      </div>
      <div className="card-footer">
        <button className="btn-primary" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.object,
  onDelete: PropTypes.func,
};

export default Event;
