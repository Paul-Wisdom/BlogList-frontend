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

export default Message