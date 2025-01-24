import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io(); // Adjust with your WebSocket server URL if needed

interface Message {
  content: string;
  createdAt: string;
  message_index: number;
  recipient_email: string;
  sender_email: string;
  updatedAt: string;
}

interface ChatWindowProps {
  messages: Message[];
  currentUserEmail: string;
  recipientEmail:string;
  onNewMessage: (message: Message) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, currentUserEmail, recipientEmail, onNewMessage }) => {
   const [gigachad, setGigachad] = useState("");
   const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mojMail = async () => {
      try {
        const response = await fetch('/api/chat/mojmail/ajde', {method:"POST"}); 
        const email = await response.json();       
        setGigachad(email.email);                
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if(gigachad === "") mojMail();

    socket.emit('joinRoom', gigachad);

    socket.on('newMessage', (message: Message) => {
      onNewMessage(message); // Update UI with new message
    });

    return () => {
      socket.off('newMessage');
    };
  }, [gigachad, onNewMessage]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="chat-header">{recipientEmail}</div>
      <div className="chat-window">
        {messages.map((msg) => (
          <div
            key={msg.message_index}
            className={`message ${msg.sender_email && msg.sender_email === currentUserEmail ? 'sent' : 'received'}`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
    </>
  );
};

export default ChatWindow;
