import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
let config = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`, config);
  return response.data;
};

const createComment = async (id, newComment) => {
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    newComment,
    config
  );
  return response.data;
};

export default {
  getAll,
  getComments,
  create,
  createComment,
  deleteBlog,
  update,
  setToken,
};
