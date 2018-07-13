import { Model } from 'objection';
import { db } from '../services/db';
import { Meta } from './meta';

export class Post extends Model {
    public static tableName = 'post';
    public id: number;
    public author_user_id: number;
    public header: string;
    public content: string;

    static get relationMappings() {
        return {
            meta: {
                relation: Model.HasOneRelation,
                modelClass: Meta,
                join: {
                    from: "post.id",
                    to: "meta.item_id",
                },
            }
        };
    }
}

Post.knex(db);