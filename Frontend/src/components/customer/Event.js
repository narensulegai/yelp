import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {formatDate, to12Hr} from '../../util';

const Event = ({ event, onRegister }) => {
  const [expand, setExpand] = useState(false);

  const toggle = () => {
    setExpand(!expand);
  };

  return (
    <div className="card mt-2">
      <div className="card-header pointer-event" onClick={toggle}>
        <div><b> {event.name}</b></div>
        <div className="small">{formatDate(event.date)} at {to12Hr(event.time)}</div>
        <a className="btn-link ">See more</a>
      </div>
      {expand && (
        <>
          <div className="card-body">
            <div>{event.description}</div>
            <div>Hosted by <b>{event.restaurant.name}</b></div>
            <h6>Hashtags {event.hashTags}</h6>
            <div>Venue at {event.location}</div>
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
