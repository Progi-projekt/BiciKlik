import React from 'react';
import Message from './message';
import ChatInput from './chatinput';
import './chatwindow.css';

const ChatWindow = () => {
  const messages = [
    { sender: 'Zoran', text: 'Skibidi pozdrav!' },
    { sender: 'You', text: 'Ne ne, pozdrav tebi!' },
    { sender: 'Zoran', text: 'Kako si?' },
    { sender: 'You', text: 'Sigmastično.' }
  ];

  return (
    <div className="chat-window">
      <div className="message-history">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatWindow;