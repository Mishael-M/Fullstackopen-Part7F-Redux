/* eslint-disable indent */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import BlogList from './components/BlogList';
import BlogPage from './components/BlogPage';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import User from './components/User';
import Users from './components/Users';
import { blogChange } from './reducers/blogReducer';
import { removeUser, userChange } from './reducers/userReducer';
import { usersChange } from './reducers/usersReducer';
import blogService from './services/blogs';
import usersService from './services/users';

const Button = styled.button`
  background: #e4717a;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #c41e3a;
  border-radius: 3px;
  &:hover {
    background: rgba(200, 0, 0, 0.5);
  }
`;
const Page = styled.div`
  padding: 1em;
  background: #f4c2c2;
`;

const Navigation = styled.div`
  background: #f88379;
  padding: 1em;
`;

const Footer = styled.div`
  background: #c41e3a;
  padding: 1em;
  margin-top: 1em;
`;

const App = () => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  // Checks if a user is already logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(userChange(user));
      blogService.setToken(user.token);
    }
  }, []);

  // If a user is already logged in, refetch blogs list
  useEffect(() => {
    if (user !== null) {
      (async () => {
        try {
          const blogs = await blogService.getAll();
          const newBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
          dispatch(blogChange(newBlogs));
        } catch (e) {
          dispatch(removeUser());
        }
      })();
    }
  }, [user]);

  // Get all users
  const userFetch = async () => {
    try {
      const response = await usersService.getAll();
      dispatch(usersChange(response));
    } catch (e) {
      dispatch(removeUser());
    }
  };

  useEffect(() => {
    userFetch();
  }, []);

  // Handle likes for blogs
  const updateLikesOf = async (id, blogs) => {
    const blog = blogs.find((b) => b.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(blog.id, changedBlog);

    const updatedBlogs = await blogService.getAll();
    const newBlogs = [...updatedBlogs].sort((a, b) => b.likes - a.likes);
    dispatch(blogChange(newBlogs));
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(removeUser());
  };

  // Get parameters of URL
  const matchUsersId = useMatch('/users/:id');

  const userInfo = matchUsersId
    ? users.find((user) => {
        return user.id === matchUsersId.params.id;
      })
    : null;

  const matchBlogId = useMatch('/blogs/:id');

  const blogInfo = matchBlogId
    ? blogs.find((blog) => {
        return blog.id === matchBlogId.params.id;
      })
    : null;

  const padding = {
    padding: 5,
  };

  const Black = {
    color: 'black',
  };

  return (
    <Page>
      <Navigation>
        {user === null ? (
          <LoginForm />
        ) : (
          <span>
            <Link style={{ ...padding, ...Black }} to='/'>
              blogs
            </Link>
            <Link style={{ ...padding, ...Black }} to='/users'>
              users
            </Link>
            {user.name} is logged in
            <Button onClick={handleLogout} id='logout-button'>
              Logout
            </Button>
          </span>
        )}
      </Navigation>
      <Routes>
        <Route
          path='/users'
          element={
            <>
              {user !== null ? (
                <>
                  <Users users={users} />
                </>
              ) : (
                <></>
              )}
            </>
          }
        />
        <Route
          path='/'
          element={
            <>
              {user !== null ? (
                <>
                  <Notification />
                  <h2>Blogs</h2>
                  <BlogList updateLikes={updateLikesOf} />
                </>
              ) : (
                <></>
              )}
            </>
          }
        />
        <Route
          path='/users/:id'
          element={
            <>
              {user !== null ? (
                <>
                  <User user={userInfo} />
                </>
              ) : (
                <></>
              )}
            </>
          }
        />
        <Route
          path='/blogs/:id'
          element={
            <>
              {user !== null ? (
                <>
                  <BlogPage
                    blog={blogInfo}
                    updateLikes={() => updateLikesOf(blogInfo.id, blogs)}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          }
        />
      </Routes>
      <Footer>
        <em>Bloglist app, Department of Computer Science 2023</em>
      </Footer>
    </Page>
  );
};

export default App;
