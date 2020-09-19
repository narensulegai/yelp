import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Event = ({ event, onRegister }) => {
  const [expand, setExpand] = useState(false);

  const toggle = () => {
    setExpand(!expand);
  };

  return (
    <div className="card mt-2">
      <div className="card-header pointer-event" onClick={toggle}>
        <h4>Event<b> {event.name}</b></h4>
        <div>Hosted by restaurant {event.Restaurant.name}</div>
        <h6 className="pointer-event">Click to see details</h6>
      </div>
      {expand && (
        <>
          <div className="card-body">
            <p>{event.description}</p>
            <h6>Hashtags {event.hashTags}</h6>
          </div>
          <div className="card-footer">
            <div>Venue at {event.location} on {event.date} at {event.time}</div>
            <div className="mt-2">
              <button onClick={onRegister} className="btn-primary">Register</button>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

Event.propTypes = {
  event: PropTypes.object,
  onRegister: PropTypes.func,
};

export default Event;
