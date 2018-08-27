import { Model } from 'objection';
import { db } from '../services/db';

export class RefreshToken extends Model {
    public static tableName = 'refresh_token';
    public static idColumn = 'token';
    public token: string;
    public user_id: number;
    public device: string;
}

RefreshToken.knex(db);