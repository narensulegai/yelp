const init = { currentUser: { user: null, scope: null }, myOrders: null, messages: {} };

export default (state = init, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
    case 'SET_MY_ORDERS':
      return {
        ...state,
        myOrders: action.payload.myOrders,
      };
    case 'SET_MESSAGES_FROM':
      return {
        ...state,
        messages: { ...state.messages, [action.payload.from]: action.payload.messages },
      };
    default:
      return init;
  }
};
