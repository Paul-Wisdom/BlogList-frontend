import { useState } from "react"
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, setUser, setBlogs, blogs }) => {
  const [detailsVisible, setDetailsVisble] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('view');
  const visibleStyle = { display: detailsVisible ? '' : 'none' }
  const generalStyle = {
    border: "2px solid black",
    padding: "3px",
    margin: "3px"
  }

  const handleClick = () => {
    if (detailsVisible === true) {
      setDetailsVisble(false)
      setButtonLabel('view')
    }
    else {
      setDetailsVisble(true)
      setButtonLabel('hide')
    }

  }

  const handleDelete = async () => {
    try {
      const confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
      console.log(confirmation)
      if (confirmation) {
        await blogService.deleteBlog(blog.id);
        const newBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(newBlogs);
      }
    }
    catch(e){
      console.log(e);
    }
  }

  const handleLike = async () => {
    try {
      const response = await blogService.likeBlog(blog.id, blog.likes + 1)
      console.log(response);
      setUser(response.data.userId)
    }
    catch (e) {
      console.log(error);
    }

  }
  // console.log(blog)

  return (
    <div style={generalStyle}>
      <div>{blog.title} {blog.author} <button onClick={handleClick}>{buttonLabel}</button></div>
      <div style={visibleStyle}>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.userId.name}</div>
        <div><button onClick={handleDelete}>remove</button></div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired
}
export default Blog