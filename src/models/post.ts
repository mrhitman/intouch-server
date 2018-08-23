import { Model } from 'objection';
import { db } from '../services/db';
import { Meta } from './meta';

export class Post extends Model {
    public static tableName = 'post';
    public id: number;
    public author_id: number;
    public owner_id: number;
    public header: string;
    public content: string;
    public meta: Meta;

    toJSON() {
        const meta = this.meta;
        return {
            id: this.id,
            header: this.header,
            content: this.content,
            likes: meta.likes,
            dislikes: meta.dislikes,
            views: meta.views,
            created_at: meta.created_at,
            updated_at: meta.updated_at,
            author_id: this.author_id,
            owner_id: this.owner_id,
        }
    }

    static get relationMappings() {
        return {
            meta: {
                relation: Model.HasOneRelation,
                modelClass: Meta,
                join: {
                    from: "post.id",
                    to: "meta.item_id",
                },
            },
        };
    }
}

Post.knex(db);