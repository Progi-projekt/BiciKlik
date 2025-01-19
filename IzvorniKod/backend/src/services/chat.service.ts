import {AppUser} from '../models/appuser.model';
import {Message} from "../models/message.model";
import {Op} from 'sequelize';

export class ChatService {

    // returns all the users that you've communicated with
    public async getChattersOfUser(email: string) {
        try {
          // Step 1: Fetch unique user emails involved in messages
          const messageParticipants = await Message.findAll({
            attributes: ["sender_email", "recipient_email"],
            where: {
              [Op.or]: [
                { sender_email: email },
                { recipient_email: email },
              ],
            },
          });
      
          // Step 2: Extract unique participant emails (excluding the logged-in user)
          const participantEmails = new Set<string>();
          messageParticipants.forEach((message) => {
            if (message.sender_email !== email) {
              participantEmails.add(message.sender_email);
            }
            if (message.recipient_email !== email) {
              participantEmails.add(message.recipient_email);
            }
          });
      
          // Step 3: Fetch user details for the participant emails
          const chattedUsers = await AppUser.findAll({
            where: {
              email: {
                [Op.in]: Array.from(participantEmails),
              },
            },
          });
      
          // Step 4: Map results to the desired format
          return chattedUsers.map((user) => ({
            email: user.email,
            name: user.name,
          }));
        } catch (error) {
          console.error("Error fetching chatted users:", error);
          throw error;
        }
      }
    

    public async getAllChatsWithAnotherUser(senderEmail: string, recipientEmail: string) {
    try {
        console.log(senderEmail);
        console.log(recipientEmail);
        // Fetch chat history between the sender and recipient
        const chats = await Message.findAll({
            where: {
                [Op.or]: [
                    { sender_email: senderEmail, recipient_email: recipientEmail },
                    { sender_email: recipientEmail, recipient_email: senderEmail },
                ],
            },
            order: [['message_index', 'ASC']], // Ensure messages are ordered by creation date
        });

        console.log(chats);

        return chats; // Return an empty array if no messages exist
    } catch (error) {
        console.error("Error fetching chats:", error);
        throw new Error("Unable to fetch chats");
    }
}


    // sends new message from one appuser to another, returns false on failure and true on success
    public async sendMessage(from: string, to:string, content: string) {
        const all_messages = await this.getAllChatsWithAnotherUser(from, to);
        if (all_messages === null) return false;

        const message_count = all_messages.length;

        const newMessage = new Message();
        newMessage.sender_email = from;
        newMessage.recipient_email = to;
        newMessage.message_index = message_count;
        newMessage.content = content;

        await newMessage.save();
        return true;
    }

}