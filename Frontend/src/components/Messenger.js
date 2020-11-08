import React, { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageTo, getMessagesFrom } from '../util/fetch/api';
import { formatDate, formatTime } from '../util';
import { setMessagesFrom } from '../actions';

const Messenger = ({ toUser, customerView = false }) => {
  const textarea = createRef();
  const messages = useSelector((state) => state.messages[toUser.id] || null);
  const dispatch = useDispatch();

  const reloadMessages = async () => {
    dispatch(setMessagesFrom(toUser.id, await getMessagesFrom(toUser.id)));
  };

  useEffect(() => {
    (async () => {
      // Load messages if only if it is not in redux store
      if (messages === null) await reloadMessages();
    })();
  }, [toUser]);

  const sendMessage = async () => {
    const txt = textarea.current.value;
    await sendMessageTo(txt, toUser.id);
    await reloadMessages();
  };

  return (
    <div>
      <button className="btn-primary" onClick={reloadMessages}>Refresh</button>
      {messages && (
      <div className="messages">
        <div>{messages.length === 0 ? 'No messages to show ' : null}</div>
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
      )}
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
};

export default Messenger;
