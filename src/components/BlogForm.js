import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

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

const Input = styled.input`
  margin: 0.25em;
`;

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    });
    setBlogTitle('');
    setBlogAuthor('');
    setBlogUrl('');
  };

  const handleBlogTitleChange = (event) => {
    setBlogTitle(event.target.value);
  };

  const handleBlogAuthorChange = (event) => {
    setBlogAuthor(event.target.value);
  };

  const handleBlogURLChange = (event) => {
    setBlogUrl(event.target.value);
  };

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <Input
            type='text'
            value={blogTitle}
            name='Title'
            onChange={handleBlogTitleChange}
            id='title-input'
          />
        </div>
        <div>
          Author:
          <Input
            type='text'
            value={blogAuthor}
            name='Author'
            onChange={handleBlogAuthorChange}
            id='author-input'
          />
        </div>
        <div>
          Url:
          <Input
            type='text'
            value={blogUrl}
            name='Url'
            onChange={handleBlogURLChange}
            id='url-input'
          />
        </div>
        <Button type='submit' id='createblog-button'>
          Create
        </Button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
