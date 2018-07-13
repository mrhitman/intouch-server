import { Model } from 'objection';
import { db } from '../services/db';

export class Meta extends Model {
    public item_id: number;
    public likes: number;
    public views: number;
    public created_at: number;
    public updated_at: number;
}

Meta.knex(db);