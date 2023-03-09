import React, { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { sendNotification } from './reducers/notificationReducer';
import { blogChange } from './reducers/blogReducer';
import { removeUser, userChange } from './reducers/userReducer';

const App = () => {
  const user = useSelector((state) => state.user);

  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(userChange(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      (async () => {
        try {
          const blogs = await blogService.getAll();
          dispatch(blogChange(blogs.sort((a, b) => b.likes - a.likes)));
        } catch (e) {
          dispatch(removeUser());
        }
      })();
    }
  }, [user]);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(removeUser());
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    const returnedBlog = await blogService.create(blogObject);
    // Really bad but it is the only way I can get delete button on blogs
    const blogs = await blogService.getAll();
    dispatch(blogChange(blogs));
    const notificationMessage = {
      notificationMessage: `A New Blog: ${returnedBlog.title} by ${returnedBlog.author} has been added!`,
      errorState: false,
    };
    dispatch(sendNotification(notificationMessage));
    setTimeout(() => {
      dispatch(
        sendNotification({
          errorState: null,
        })
      );
    }, 5000);
  };

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} user={user} />
    </Togglable>
  );

  const updateLikesOf = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(blog.id, changedBlog);

    const updatedBlogs = await blogService.getAll();
    const newBlogs = [...updatedBlogs].sort((a, b) => b.likes - a.likes);
    dispatch(blogChange(newBlogs));
  };

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} is logged in
            <button onClick={handleLogout} id='logout-button'>
              Logout
            </button>
          </p>
          <Notification />
          {blogForm()}
          <div>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                blogs={blogs}
                updateLikes={() => updateLikesOf(blog.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
