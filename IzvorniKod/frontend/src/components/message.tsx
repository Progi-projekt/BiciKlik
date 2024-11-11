import React from 'react';
import './message.css';

const Message = ({sender,text} : {sender:any, text:any}) => {
  const isUser = sender === 'You';
  return (
    <div className={`message ${isUser ? 'user' : 'contact'}`}>
      <div className="message-sender">{sender}</div>
      <div className="message-text">{text}</div>
    </div>
  );
};

export default Message;