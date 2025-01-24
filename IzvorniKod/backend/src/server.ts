import app from './app';
import { Server } from "socket.io";
import { createServer } from "http";

const PORT = process.env.PORT || 3000;

// Create an HTTP server using the Express app
const httpServer = createServer(app);

// Initialize the WebSocket server
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Adjust as needed for security
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", async (data) => {
    const { senderEmail, recipientEmail, content } = data;
  
    if (!senderEmail || !recipientEmail || !content) {
      console.error("Invalid message data");
      return;
    }
  
    const message = {
      sender_email: senderEmail,
      recipient_email: recipientEmail,
      content: content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    io.to(recipientEmail).emit("newMessage", message);
    console.log(`Message sent:`, message);
  });

  socket.on("joinRoom", (email) => {
    socket.join(email);
    console.log(`User joined room: ${email}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server once with HTTP and WebSocket
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
