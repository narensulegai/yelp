import React, { useEffect, useState } from 'react';
import Messenger from '../Messenger';
import { getCustomerProfile } from '../../util/fetch/api';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);

  useEffect(() => {
    (async () => {
      const customer = await getCustomerProfile();
      setConversations(customer.conversations);
      setCurrentConversation(customer.conversations[0]);
    })();
  }, []);

  const handleOnConversationChange = (e) => {
    const restaurantId = e.target.value;
    const i = conversations.findIndex((c) => c.id === restaurantId);
    setCurrentConversation(conversations[i]);
  };

  return (
    <div>
      {currentConversation
        ? (
          <div>
            <h4>
              You have messages {conversations.length} restaurant(s)
            </h4>
            <div>
              <span>Select restaurant</span>
              <select value={currentConversation.id} onChange={handleOnConversationChange}>
                {conversations.map((c) => {
                  return <option key={c.id} value={c.id}>{c.name}</option>;
                })}
              </select>
            </div>

            <Messenger toUser={currentConversation} customerView />
          </div>
        )
        : <div>No messages yet.</div>}
    </div>
  );
};

Messages.propTypes = {};

export default Messages;
