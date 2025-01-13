import { Request, Response } from 'express';
import { ChatService } from '../services/chat.service';
import { EventService } from '../services/event.service';

export class ChatController {
    private chatService: ChatService;

    constructor() {
        this.chatService = new ChatService();
    }


    public getChattersOfUser = async (req: Request, res: Response) => { //getting last 10 events
        const email = req.cookies.loggedInAs;
        try {
            const chatters = await this.chatService.getChattersOfUser(email);
            res.json(chatters);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    };

    public getAllChatsWithAnotherUser = async (req: Request, res: Response) => {    //getting event by id
        const email = req.cookies.loggedInAs;
        const email_another = req.params.email_another;
        try {
            const chats = await this.chatService.getAllChatsWithAnotherUser(email, email_another);
            res.json(chats);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    };

    public sendMessage = async (req: Request, res: Response) => {    //getting event by id
        const email = req.cookies.loggedInAs;
        const email_another = req.params.email_another;
        const content = req.body.content;
        try {
            await this.chatService.sendMessage(email, email_another, content);
            res.status(200).json("Successfully sent");
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    };
}