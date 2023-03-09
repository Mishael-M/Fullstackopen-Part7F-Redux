import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import Notification from './Notification';
import { useDispatch } from 'react-redux';
import { sendNotification } from '../reducers/notificationReducer';
import { blogChange } from '../reducers/blogReducer';
import { userChange } from '../reducers/userReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(userChange(user));
      setUsername('');
      setPassword('');
      const response = await blogService.getAll();
      dispatch(blogChange(response.sort((a, b) => b.likes - a.likes)));
    } catch (exception) {
      dispatch(
        sendNotification({
          notificationMessage: 'Wrong Username or Password',
          errorState: true,
        })
      );
      // Removes notification
      setTimeout(() => {
        dispatch(
          sendNotification({
            errorState: null,
          })
        );
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to Application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            id='password'
            type='password'
            value={password}
            name='current-password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' id='login-button'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
