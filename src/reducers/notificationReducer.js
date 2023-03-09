export const sendNotification = ({ notificationMessage, errorState }) => {
  switch (errorState) {
    case true:
      return {
        type: 'ERROR_MESSAGE',
        payload: {
          message: notificationMessage,
        },
      };
    case false:
      return {
        type: 'SUCCESS_MESSAGE',
        payload: {
          message: notificationMessage,
        },
      };
    default:
      return {
        type: 'CLEAR_MESSAGE',
        payload: {},
      };
  }
};

const notificationReducer = (
  state = { message: '', errorState: false },
  action
) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return { ...state, message: action.payload.message, errorState: false };
    case 'ERROR_MESSAGE':
      return { ...state, message: action.payload.message, errorState: true };
    case 'CLEAR_MESSAGE':
      return { ...state, message: '', errorState: false };
    default:
      return state;
  }
};

export default notificationReducer;
