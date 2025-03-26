import { useState } from "react"
import PropTypes from "prop-types";

const Blog = ({user, blog, setUser, setBlogs, blogs, likeBlog, deleteBlog }) => {
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
        await deleteBlog(blog.id);
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
      const response = await likeBlog(blog.id, blog.likes + 1)
      console.log(response);
      setUser(response.data.userId)
    }
    catch (error) {
      console.log(error);
    }

  }
  // console.log(blog)

  return (
    <div style={generalStyle} className="blog">
      <div><p>{blog.title}</p> <p>{blog.author}</p> <button onClick={handleClick}>{buttonLabel}</button></div>
      <div style={visibleStyle} data-testid="togglableContent"> 
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.userId.name}</div>
        <div style={{display: blog.userId.username !== user.username? 'none': ''}}><button onClick={handleDelete}>remove</button></div>
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