import { Model } from 'objection';
import { db } from '../services/db';

export class Profile extends Model {
    public static tableName = 'profile';
    public user_id: number;
    public first_name: string;
    public last_name: string;
    public birthday: number;
    public photo: string;
    public quote: string;
}

Profile.knex(db);