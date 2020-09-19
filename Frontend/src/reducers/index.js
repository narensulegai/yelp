const app = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        ...{ message: { ...action } },
      };

    default:
      return { message: { text: null } };
  }
};

export default app;
