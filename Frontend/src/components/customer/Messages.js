import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Messenger from '../Messenger';

const Messages = () => {
  const [currentConversation, setCurrentConversation] = useState(null);

  const conversations = useSelector((state) => {
    if (state.currentUser.user) {
      return state.currentUser.user.conversations;
    }
    return [];
  });

  useEffect(() => {
    if (conversations.length) {
      setCurrentConversation(conversations[0]);
    }
  }, [conversations]);

  const handleOnConversationChange = (e) => {
    const restaurantId = e.target.value;
    const i = conversations.findIndex((c) => c.id === restaurantId);
    setCurrentConversation(conversations[i]);
  };

  return (
    <div className="row">
      <div className="col-12">
        {currentConversation
          ? (
            <>
              <h4>You have messages {conversations.length} restaurant(s)</h4>
              <div>
                <span className="mr-3">Select restaurant</span>
                <select value={currentConversation.id} onChange={handleOnConversationChange}>
                  {conversations.map((c) => {
                    return <option key={c.id} value={c.id}>{c.name}</option>;
                  })}
                </select>
              </div>

              <Messenger toUser={currentConversation} customerView />
            </>
          )
          : <div>No messages yet.</div>}
      </div>
    </div>
  );
};

Messages.propTypes = {};

export default Messages;
