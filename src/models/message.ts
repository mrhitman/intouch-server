import { Model } from 'objection';
import { db } from '../services/db';

export class Message extends Model {
    public static tableName = 'message';
    public id: number;
    public from: number;
    public to: number;
    public created_at: number;
    public viewed: boolean;
    public text: string;
}

Message.knex(db);
