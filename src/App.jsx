import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Message from './components/Message'

import blogService from './services/blogs'
import userService from './services/user'


const LoginForm = ({ msg, setMsg, setUser, msgType, setMsgType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await userService.login({ username, password });
      console.log(user)
      setUser(user.data)
      blogService.setToken(user.data.token);
      window.localStorage.setItem('user', JSON.stringify(user.data));
    }
    catch (error) {
      console.log(error);
      setMsgType('error')
      setMsg(error.response.data)
      setTimeout(() => {
        setMsg(null)
        setMsgType('')
      }, 5000)
    }
  }

  return (
    <div>
      <Message msg={msg} msgType={msgType} />
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <div>
          <label id='username'>username:</label>
          <input type='text' name='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </div>
        <div>
          <label id='password'>password:</label>
          <input type="password" name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

const Togglable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} >{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>

    </div>
  )
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(null);
  const [msgType, setMsgType] = useState('')

  useEffect(() => {
    const setAllBlogs = async () => {
      const response = await blogService.getAll();
      const sortedBlogs = response.data.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    setAllBlogs();
  }, [user])
  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem("user"));
    console.log('userData', userData);
    if (userData) {
      setUser(userData);
      blogService.setToken(userData.token);
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("user")
  }

  console.log(user)
  return (!user ? <LoginForm msg={msg} setMsg={setMsg} setUser={setUser} msgType={msgType} setMsgType={setMsgType} /> :
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel={"new note"}>
        <BlogForm user={user} blogs={blogs} msg={msg} setMsg={setMsg} setBlogs={setBlogs} msgType={msgType} setMsgType={setMsgType} createBlog={blogService.createBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setUser={setUser} setBlogs={setBlogs} blogs={blogs} likeBlog={blogService.likeBlog} deleteBlog={blogService.deleteBlog}/>
      )}
    </div>
  )
}

export default App