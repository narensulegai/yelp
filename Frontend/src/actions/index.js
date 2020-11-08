export const setCurrentUser = (currentUser) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: {
      currentUser,
    },
  };
};

export const setMyOrders = (myOrders) => {
  return {
    type: 'SET_MY_ORDERS',
    payload: {
      myOrders,
    },
  };
};

export const setMessagesFrom = (from, messages) => {
  return {
    type: 'SET_MESSAGES_FROM',
    payload: {
      from,
      messages,
    },
  };
};
