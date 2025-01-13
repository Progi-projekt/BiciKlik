import {AppUser} from '../models/appuser.model';
import {Message} from "../models/message.model";
import {Op} from 'sequelize';

export class ChatService {

    // returns all the users that you've communicated with
    public async getChattersOfUser(email: string) {
        const chattedUsers = await AppUser.findAll({
            where: {
                email: {
                    [Op.ne]: email, // Exclude the user themselves
                },
            },
            include: [
                {
                    model: Message,
                    as: "sentMessages",
                    where: {sender_email: email},
                    attributes: [], // No need to fetch Message attributes
                    required: false, // Include users even if no sent messages
                },
                {
                    model: Message,
                    as: "receivedMessages",
                    where: {recipient_email: email},
                    attributes: [], // No need to fetch Message attributes
                    required: false, // Include users even if no received messages
                },
            ],
        });

        return chattedUsers.map((user: AppUser) => ({
            email: user.email,
            name: user.name
        }));
    }

    public async getAllChatsWithAnotherUser(email: string, email_another:string) {
        const user = await AppUser.findByPk(email);
        const chattedUser = await AppUser.findByPk(email_another);
        if (chattedUser === null || user === null) return null;
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    {
                        sender_email: email,
                        recipient_email: email_another
                    },
                    {
                        sender_email: email_another,
                        recipient_email: email,
                    }
                ]
            },
        });
        //sort by message index
        messages.sort((msg1, msg2) => msg1.message_index - msg2.message_index);
        return messages;
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