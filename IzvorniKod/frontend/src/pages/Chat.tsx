import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import ChatWindow from '../components/chatwindow';
import ChatInput from '../components/chatinput';
import { io } from 'socket.io-client';
import '../components/chat.css';

interface Message {
  content: string;
  createdAt: string;
  message_index: number;
  recipient_email: string;
  sender_email: string;
  updatedAt: string;
}

const socket = io();

const Chat = () => {
  const [gigachad,setGigachad]=useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {

    const mojMail = async () => {
      
      try {
        const response = await fetch('/api/chat/mojmail/ajde',{method:"POST"}); 
        const email = await response.json();       
        setGigachad(email.email);                
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (gigachad==="")
    mojMail();
    

    
    if (selectedUser) {
      socket.emit('joinRoom', selectedUser);
      socket.on('newMessage', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
    return () => {
      socket.off('newMessage');
    };
  }, [gigachad,selectedUser]);

  const fetchMessages = async (email: string) => {
    try {
      const response = await fetch(`/api/chat/${email}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleUserSelect = (email: string) => {
    setSelectedUser(email);
    fetchMessages(email);
  };

  const handleSendMessage = async (content: string) => {

  };

  return (
    <div className="chat">
      <Sidebar onUserSelect={handleUserSelect} />
      <div className="chat-main">
        {selectedUser ? (
          <>
            <ChatWindow messages={messages} currentUserEmail={gigachad} recipientEmail={selectedUser} onNewMessage={(message) => setMessages((prev) => [...prev, message])} />
            <ChatInput onSendMessage={handleSendMessage} recipientEmail={selectedUser} currentUserEmail={gigachad} />
          </>
        ) : (
          <div className="placeholder">Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default Chat;