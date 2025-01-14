import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void; // Callback to update the UI after sending
  recipientEmail: string; // Email of the user to whom the message will be sent
}

const ChatInput: React.FC<ChatInputProps> = ({onSendMessage,recipientEmail }) => {
  const [content, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (!content.trim() || !recipientEmail) {
      console.error('Message or recipient email is invalid.');
      return;
    }

    try {
      const response = await fetch(`/api/chat/${recipientEmail}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({content}),
      });

      if (response.ok) {
        const newMessage = content; // Expecting the server to return the sent message
        onSendMessage(newMessage); // Pass the new message back to the parent for UI update
        setMessage(''); // Clear the input box after sending the message
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={content}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatInput;
