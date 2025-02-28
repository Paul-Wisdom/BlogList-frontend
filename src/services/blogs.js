import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null;

const setToken = (jwt) => {
  token = jwt;
}
const getAll = () => {
  return axios.get(baseUrl)
  // return request.then(response => response.data)
}

const likeBlog = (blogId, likes) => {
  return axios.put(`${baseUrl}/${blogId}`, {likes}, {headers:{Authorization: `Bearer ${token}`}})
}

const deleteBlog = (blogId) => {
  return axios.delete(`${baseUrl}/${blogId}`, {headers:{Authorization: `Bearer ${token}`}})
}

const createBlog = (blogData) => {
  return axios.post(baseUrl, blogData, {headers:{Authorization: `Bearer ${token}`}})
}
export default { getAll, createBlog, likeBlog, deleteBlog, setToken }