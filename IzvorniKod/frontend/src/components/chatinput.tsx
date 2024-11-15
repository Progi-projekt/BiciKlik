import React from 'react';
import './chatinput.css';

const ChatInput = () => {
  return (
    <div className="chat-input">
      <input type="text" placeholder="Type a message..." />
      <button>Send</button>
    </div>
  );
};

export default ChatInput;