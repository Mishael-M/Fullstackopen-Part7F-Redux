import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import { BrowserRouter as Router } from 'react-router-dom';
import usersReducer from './reducers/usersReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  notifications: notificationReducer,
  user: userReducer,
  users: usersReducer,
});

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
