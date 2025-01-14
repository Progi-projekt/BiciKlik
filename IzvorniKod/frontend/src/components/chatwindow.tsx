import React from 'react';

interface Message {
  id: number;
  content: string;
  createdAt: string;
  message_index: number;
  recipient_email: string;
  sender_email: string;
  updatedAt: string;
}

interface ChatWindowProps {
  messages: Message[]; // Array of message objects
  currentUserEmail: string; // Email of the logged-in user
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, currentUserEmail }) => {
  // Derive the recipient's email from the messages
  const recipientEmail =
    messages.length > 0
      ? messages[0].sender_email !== currentUserEmail
        ? messages[0].recipient_email
        : messages[0].sender_email
      : '';

  return (
    <>
      {/* Header Bar */}
      <div className="chat-header">{recipientEmail}</div>

      {/* Messages */}
      <div className="chat-window">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender_email !== currentUserEmail ? 'sent' : 'received'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatWindow;
