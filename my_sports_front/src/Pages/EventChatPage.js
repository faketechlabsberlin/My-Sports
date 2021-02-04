import React, { useEffect } from 'react';
import { connect } from "react-redux";
import io from 'socket.io-client';
import { getMessagesFunc, saveMessage, clearMessages } from '../actions/message';

const mapStateToProps = ({ session, message }) => ({
  session,
  message
});  

const mapDispatchToProps = dispatch => ({
  getMessagesFunc: (id) => dispatch(getMessagesFunc(id)),
  saveMessage: (payload) => dispatch(saveMessage(payload)),
  clearMessages: () => dispatch(clearMessages())
})

const EventChatPage = ({ session, message, getMessagesFunc, saveMessage, clearMessages, id, event, myInfo }) => {

  const socket = io();

  const scrollFunction = () => {
    const element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
  }

  socket.on('displayMessage', (msg) => {
    saveMessage(msg);
    scrollFunction();
  })

  useEffect(async() => {
    await getMessagesFunc(id);
    scrollFunction();
    socket.emit('joinRoom', id)
    return () => {
      socket.emit('leaveRoom', id)
      socket.disconnect();
      clearMessages();
    }
  }, [])

  useEffect(() => {
    return () => {
      socket.emit('leaveRoom', id)
      socket.disconnect();
      clearMessages();
    }
  }, [])

  socket.on('disconnect', () => {
    console.log('User disconnected from front end')
  });

  const emit = (e) => {
    e.preventDefault();
    const messageData = {
      event: event._id,
      user: session.userId,
      message: e.target.chatMessage.value
    }
    socket.emit('message', messageData);
    e.target.chatMessage.value = '';
  }

  const iconEntity = <React.Fragment>&#9673;</React.Fragment>

  return (
      <div className="form-box-white">
        <div className="card" style={{width: 100 + '%'}}>
          <div className="card-body">
            <h3 className="event-page-event-title text-muted card-title">Team Chat</h3>
          </div>
          <section>
              <ul id="messages">
                {message && message.map((m) => {
                  return <li key={m._id}>{myInfo.username === m.user.username ? <b className="user-chat-color">{iconEntity}{m.user.username}: </b>: <b className="other-chat-color">{iconEntity}{m.user.username}:</b>} {m.message}</li>
                })}
              </ul>
          </section>
          <form className="test-form row justify-content-between mx-auto" id="chat-form" onSubmit={emit}>
              <input placeholder="type a message..." className="test-form-input" name="chatMessage" id="msg" autoComplete="off" />
              <button className="test-form-button my-auto"><i className="pointer material-icons md-18 grey-icon">send</i></button>
            </form>
          </div>
      </div>
  )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventChatPage);
