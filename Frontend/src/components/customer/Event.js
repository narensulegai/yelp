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
        <div>Event<b> {event.name}</b></div>
        <div>Hosted by <b>{event.restaurant.name}</b></div>
        <a className="btn-link ">See more</a>
      </div>
      {expand && (
        <>
          <div className="card-body">
            <div>{event.description}</div>
            <h6>Hashtags {event.hashTags}</h6>
            <div>Venue at {event.location} on {event.date} at {event.time}</div>
          </div>
          <div className="card-footer">
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
