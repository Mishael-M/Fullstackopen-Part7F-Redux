export const usersChange = (users) => {
  return {
    type: 'UPDATE_USERS',
    payload: users,
  };
};

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_USERS':
      return action.payload;
    default:
      return state;
  }
};

export default usersReducer;
