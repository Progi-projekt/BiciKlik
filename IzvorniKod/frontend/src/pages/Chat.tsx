import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import ChatWindow from '../components/chatwindow';
import ChatInput from '../components/chatinput';
import '../components/chat.css';


interface Message {
  id: number;
  content: string;
  createdAt: string;
  message_index: number;
  recipient_email: string;
  sender_email: string;
  updatedAt: string;
}

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Fetch messages for the selected user
  const fetchMessages = async (email: string) => {
    try {
      const response = await fetch(`/api/chat/${email}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Handle user selection (either from contacts or search results)
  const handleUserSelect = (email: string) => {
    
    console.log('Setting selected user:', email);
    setSelectedUser(email); // Update selected user
    setSelectedUser(() => email);
    fetchMessages(email); // Fetch messages for the selected user
    console.log(messages);
  };

  // Handle sending a message
  const handleSendMessage = async (content: string) => {
    if (!selectedUser) return;
    handleUserSelect(selectedUser);
  };

  return (
    <div className="chat">
      <Sidebar onUserSelect={handleUserSelect} />
      <div className="chat-main">
        {selectedUser ? (
          <>
            <ChatWindow messages={messages} 
            currentUserEmail={selectedUser}/>
            <ChatInput
              onSendMessage={handleSendMessage}
              recipientEmail={selectedUser}
            />
          </>
        ) : (
          <div className="placeholder">Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
