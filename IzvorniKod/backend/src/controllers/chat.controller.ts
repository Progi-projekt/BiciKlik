import { Request, Response } from 'express';
import { ChatService } from '../services/chat.service';
import { EventService } from '../services/event.service';

export class ChatController {
    private chatService: ChatService;

    constructor() {
        this.chatService = new ChatService();
    }


    public getChattersOfUser = async (req: Request, res: Response) => {
        const email = req.cookies.loggedInAs; // Ensure this cookie is set
        if (!email) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
    
        try {
            const chatters = await this.chatService.getChattersOfUser(email);
            console.log(chatters);
            if (!chatters || chatters.length === 0) {
                return res.status(200).json([]); // Return an empty array if no chatters
            }
            res.status(200).json(chatters);
        } catch (error) {
            console.error('Error fetching chatters:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
    

    public getAllChatsWithAnotherUser = async (req: Request, res: Response) => {
        const email = req.cookies.loggedInAs; // The logged-in user's email
        const email_another = req.params.anotherUser; // The other user's email
        try {
            // Fetch existing chat history
            const chats = await this.chatService.getAllChatsWithAnotherUser(email, email_another);
    
            // If no prior chat exists, initialize an empty chat session
            if (!chats || chats.length === 0) {
                return res.status(200).json([]); // Return an empty array to indicate no chat history
            }
    
            // Return existing chat history
            res.status(200).json(chats);
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
        const email_another = req.params.anotherUser;
        const content = req.body.content;
        console.log("ŠALJEMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
        console.log(content);
        try {
            const result = await this.chatService.sendMessage(email, email_another, content);
            if(result){
                res.status(200).json("Successfully sent");
            }
            else{
                res.status(400).json("Invalid receiver or sender email");
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    };
}