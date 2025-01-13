import { Event } from '../models/event.model';
import { Route } from '../models/route.model';
import { Organizer } from '../models/organizer.model';
import { AppUser } from '../models/appuser.model';
import { Regular } from '../models/regular.model';
import { Participation } from '../models/participation.model';
import {Message} from "../models/message.model";
import {Op} from 'sequelize';

export class ChatService {

    // returns all the users that you've communicated with
    public async getChattersOfUser(email: string) {

    }

}