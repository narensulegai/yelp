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
        <div>Registered users:</div>
        <div>{event.customerEvents.map((c) => {
          return <span key={c.customer.id}>{c.customer.name}</span>;
        })}</div>
      </div>
      <div className="card-footer">
        <div>Venue at {event.location} on {event.date} at {event.time}</div>
        <button className="btn-primary" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.object,
};

export default Event;
