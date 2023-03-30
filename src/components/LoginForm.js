import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { blogChange } from '../reducers/blogReducer';
import { sendNotification } from '../reducers/notificationReducer';
import { userChange } from '../reducers/userReducer';
import blogService from '../services/blogs';
import loginService from '../services/login';
import Notification from './Notification';

const Button = styled.button`
  background: #e4717a;
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 1em;
  border: 2px solid #c41e3a;
  border-radius: 3px;
  &:hover {
    background: rgba(200, 0, 0, 0.5);
  }
`;

const Input = styled.input`
  margin: 0.25em;
`;

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
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(userChange(user));
      setUsername('');
      setPassword('');
      dispatch(
        sendNotification({
          errorState: null,
        })
      );
      const response = await blogService.getAll();
      const newBlogs = [...response].sort((a, b) => b.likes - a.likes);

      dispatch(blogChange(newBlogs));
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
          <Input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <Input
            id='password'
            type='password'
            value={password}
            name='current-password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type='submit' id='login-button'>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
