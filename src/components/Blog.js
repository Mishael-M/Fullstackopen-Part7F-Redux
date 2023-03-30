import React from 'react';
import { Link } from 'react-router-dom';

//TODO Update notifications
const Blog = ({ blog }) => {
  // const [visible, setVisible] = useState(false);

  // const dispatch = useDispatch();

  // const toggleVisibility = () => {
  //   setVisible(!visible);
  // };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '2px solid #c41e3a',

    borderWidth: 2,
    marginBottom: 5,
  };

  // const deleteBlog = async () => {
  //   if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
  //     const response = await blogService.deleteBlog(blog.id);
  //     const notificationMessage = {
  //       notificationMessage: `The blog ${response.title} by ${response.author} has been deleted!`,
  //       errorState: true,
  //     };
  //     dispatch(sendNotification(notificationMessage));

  //     setTimeout(() => {
  //       dispatch(sendNotification({ errorState: null }));
  //     }, 5000);
  //     dispatch(blogChange(blogs.filter((blog) => blog.id !== response.id)));
  //   }
  // };

  // const showBlog = () => (
  //   <>
  //     <p>{blog.url}</p>
  //     <p>
  //       Likes {blog.likes}{' '}
  //       <button onClick={updateLikes} className='likeButton'>
  //         Like
  //       </button>
  //     </p>
  //     <p>{blog.user.name}</p>
  //     {blog.user.username === user.username ? (
  //       <button onClick={deleteBlog} id='deleteButton'>
  //         Delete
  //       </button>
  //     ) : null}
  //   </>
  // );

  return (
    <div style={blogStyle} className='blog'>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

export default Blog;
