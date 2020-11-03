const init = { currentUser: { user: null, scope: null } };

export default (state = init, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
    default:
      return init;
  }
};
