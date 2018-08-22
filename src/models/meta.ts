import { Model } from 'objection';
import { db } from '../services/db';

export class Meta extends Model {
    public static tableName = 'meta';
    public item_id: number;
    public likes: number;
    public dislikes: number;
    public views: number;
    public created_at: number;
    public updated_at: number;

    toJSON() {
        return {
            likes: this.likes,
            dislikes: this.dislikes,
            views: this.views,
            created_at: this.created_at,
            updated_at: this.updated_at,
        }
    }
}

Meta.knex(db);