export const userChange = (user) => {
  return {
    type: 'UPDATE_USER',
    payload: user,
  };
};

export const removeUser = () => {
  return {
    type: 'REMOVE_USER',
    payload: null,
  };
};

const userReducer = (state = { name: '', token: '', username: '' }, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return action.payload;
    case 'REMOVE_USER':
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
