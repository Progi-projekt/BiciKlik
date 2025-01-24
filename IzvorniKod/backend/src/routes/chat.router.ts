import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller';

export class ChatRouter {
    public router: Router;
    private chatController: ChatController;

    constructor() {
        this.router = Router();
        this.chatController = new ChatController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/mojmail/ajde', this.chatController.mojmail);
        this.router.get('/', this.chatController.getChattersOfUser);
        this.router.get('/:anotherUser', this.chatController.getAllChatsWithAnotherUser);
        this.router.post('/:anotherUser/send', this.chatController.sendMessage);
    }
}