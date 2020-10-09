import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';

const NewEvent = ({ onAdd }) => {
  const name = useRef();
  const description = useRef();
  const location = useRef();
  const hashTags = useRef();
  const date = useRef();
  const time = useRef();
  const handleOnAdd = () => {
    onAdd({
      name: name.current.value,
      description: description.current.value,
      location: location.current.value,
      hashTags: hashTags.current.value,
      date: date.current.value,
      time: time.current.value,
    });
  };
  return (
    <div>
      <h4>Create an event</h4>
      <div>
        <TextInput label="Name" ref={name} />
        <TextInput label="Description" ref={description} />
        <TextInput label="Location" ref={location} />
        <TextInput label="Hashtags" ref={hashTags} />
        <TextInput label="Date" ref={date} type="date" />
        <TextInput label="Time" ref={time} type="time" />
      </div>
      <div>
        <button onClick={handleOnAdd} className="btn-primary">Add</button>
      </div>
    </div>

  );
};

NewEvent.propTypes = {
  onAdd: PropTypes.func,
};

export default NewEvent;
