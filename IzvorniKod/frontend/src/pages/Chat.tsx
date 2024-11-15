import React from 'react';
import Sidebar from '../components/sidebar';
import ChatWindow from '../components/chatwindow';
import '../components/chat.css';

function Chat() {
  return (
    <div className="chat">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default Chat;