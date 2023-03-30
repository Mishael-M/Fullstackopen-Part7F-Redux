import React, { useRef } from 'react';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import { sendNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { blogChange } from '../reducers/blogReducer';
import Blog from './Blog';

const BlogList = ({ updateLikes }) => {
  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

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

  const blogForm = () => (
    <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} user={user} />
    </Togglable>
  );

  return (
    <>
      {blogForm()}
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            blogs={blogs}
            updateLikes={() => updateLikes(blog.id, blogs)}
          />
        ))}
      </div>
    </>
  );
};

export default BlogList;
