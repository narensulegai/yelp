import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { sendMessageTo, getMessagesFrom } from '../util/fetch/api';
import { formatDate, formatTime } from '../util';

const Messenger = ({ toUser, scope, customerView = false }) => {
  const textarea = createRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      setMessages(await getMessagesFrom(toUser.id));
    })();
  }, [toUser, scope]);

  const sendMessage = async () => {
    const txt = textarea.current.value;
    await sendMessageTo(txt, toUser.id);
    setMessages(await getMessagesFrom(toUser.id));
  };

  const handleOnRefresh = async () => {
    setMessages(await getMessagesFrom(toUser.id));
  };

  return (
    <div>
      <div className="clearfix">
        <button className="btn-primary float-right" onClick={handleOnRefresh}>Refresh</button>
      </div>
      <div className="messages">
        {messages.reverse().map((m) => {
          return (
            <div key={m.id} className={classNames({
              'mt-2': true,
              card: true,
              currMessage: customerView ? !m.fromRestaurant : m.fromRestaurant,
              'ml-5': customerView ? m.fromRestaurant : !m.fromRestaurant,
            })}>
              <div className="card-body">
                <div className="small">
                  {customerView
                    ? (m.fromRestaurant ? toUser.name : 'You')
                    : (m.fromRestaurant ? 'You' : toUser.name)}
                </div>
                <div>{m.text}</div>
                <div className="small">{formatTime(m.createdAt)}&nbsp;{formatDate(m.createdAt)}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2">
        <textarea ref={textarea} rows="3" placeholder="Send a message" className="p-2 w-100" />
      </div>
      <div>
        <button className="btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

Messenger.propTypes = {
  customerView: PropTypes.bool,
  toUser: PropTypes.object,
  scope: PropTypes.string,
};

export default Messenger;
