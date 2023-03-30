import { useEffect, useState } from 'react';
import blogService from '../services/blogs';

/* eslint-disable react/react-in-jsx-scope */
const Comment = ({ blogId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Get all blog comments
  useEffect(() => {
    (async () => {
      const blogComments = await blogService.getComments(blogId);
      setComments(blogComments);
    })();
  }, []);

  const addComment = async (event) => {
    event.preventDefault();

    const returnedComment = await blogService.createComment(blogId, {
      blogId: blogId,
      comment: comment,
    });
    setComments([...comments, returnedComment]);
  };
  return (
    <>
      <h2>comments</h2>
      <form onSubmit={addComment} method='post'>
        <input
          id='comment'
          type='text'
          value={comment}
          name='Comment'
          onChange={({ target }) => setComment(target.value)}
        ></input>
        <button type='submit' id='comment-button'>
          add comment
        </button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </>
  );
};

export default Comment;
