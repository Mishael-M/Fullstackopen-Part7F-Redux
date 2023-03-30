/* eslint-disable react/react-in-jsx-scope */

import { Link } from 'react-router-dom';
import Comment from './Comment';

const BlogPage = ({ blog, updateLikes }) => {
  if (!blog) {
    return null;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <Link to={`${blog.url}`}>{blog.url}</Link>
      <p>
        {blog.likes}{' '}
        <button onClick={updateLikes} className='likeButton'>
          Like
        </button>
      </p>
      <p>added by {blog.author}</p>
      <Comment blogId={blog.id} />
    </div>
  );
};

export default BlogPage;
