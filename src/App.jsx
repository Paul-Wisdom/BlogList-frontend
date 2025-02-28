import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/user'


const Message = ({ msg, msgType }) => {
  const baseStyle = {
    width: '100vw',
    height: '36px',
    color: 'green',
    backgroundColor: 'grey',
    border: '2px solid green',
    borderRadius: '10px',
    paddingLeft: '10px',
    paddingTop: '10px'
  }

  const errorStyle = { ...baseStyle, color: 'red', border: '2px solid red' }
  const style = msgType === 'error' ? errorStyle : baseStyle
  return (msg ?
    <div style={style}>
      {msg}
    </div>
    : ''
  )
}

const BlogForm = ({ user, msg, setMsg, blogs, setBlogs, msgType, setMsgType }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = async (e) => {
    e.preventDefault();

    console.log(title, author, url);
    try {
      const response = await blogService.createBlog({ title, author, url });
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
          <input type="text" id='title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label id='author'>Author:</label>
          <input type="text" id='author' name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          <label id='url'>URL:</label>
          <input type="text" id='url' name='url' value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

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
        <BlogForm user={user} blogs={blogs} msg={msg} setMsg={setMsg} setBlogs={setBlogs} msgType={msgType} setMsgType={setMsgType} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setUser={setUser} setBlogs={setBlogs} blogs={blogs}/>
      )}
    </div>
  )
}

export default App