import React, { useState } from 'react';
import { io } from 'socket.io-client';
import './chatinput.css';

const socket = io(); // Adjust with your WebSocket server URL if needed

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  recipientEmail: string;
  currentUserEmail: string;
}
const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, recipientEmail, currentUserEmail }) => {
  const [content, setMessage] = useState('');
  const [gigachad, setGigachad] = useState('');
  const handleSendMessage = async () => {
    if (!content.trim() || !recipientEmail) {
      console.error('Message or recipient email is invalid.');
      return;
    }
    const mojMail = async () => {

      try {
        const response = await fetch('/api/chat/mojmail/ajde', { method: "POST" });
        const email = await response.json();
        setGigachad(email.email);
        return email.email;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    await mojMail();

    // API call to store the message
    try {
      const senderEmail = await mojMail();
      const response = await fetch(`/api/chat/${recipientEmail}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        onSendMessage({
          ...newMessage
        });
        setMessage(''); // Clear input
        // Emit message through WebSocket
        socket.emit('sendMessage', {
          senderEmail,
          recipientEmail,
          content
        });
        
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-input">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatInput;
