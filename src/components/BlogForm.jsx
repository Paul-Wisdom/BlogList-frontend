import { useState } from "react"

import Message from "./Message"

const BlogForm = ({ msg, setMsg, blogs, msgType, setMsgType, createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = async (e) => {
    e.preventDefault();

    console.log(title, author, url);
    try {
      const response = await createBlog({ title, author, url });
      console.log(response)
      console.log('blog', blogs)
      const newBlog = response.data;
      console.log('new blog', newBlog);
      blogs.push(newBlog);
      // const blogList = [...blogs]
      // blogList.push(newBlog)
      // setBlogs(blogList)
      console.log('blog list', blogs)
      const successMessage = `a new blog ${newBlog.title} by ${newBlog.author} added`
      setMsg(successMessage)
      setTimeout(() => {
        setMsg(null)
      }, 5000)
      setAuthor('')
      setTitle('')
      setUrl('')
    }
    catch (error) {
      console.log(error);
      setMsgType('error')
      setMsg(error.response.data.message)
      setTimeout(() => {
        setMsg(null)
        setMsgType('')
      }, 5000)
    }
  }

  return (
    <div>
      <Message msg={msg} msgType={msgType} />
      <h2>create new blogs</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          <label id='title'>Title:</label>
          <input type="text" id='title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title"/>
        </div>
        <div>
          <label id='author'>Author:</label>
          <input type="text" id='author' name='author' value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="author"/>
        </div>
        <div>
          <label id='url'>URL:</label>
          <input type="text" id='url' name='url' value={url} onChange={(e) => setUrl(e.target.value)} placeholder="url"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm