import { Model } from 'objection';
import { db } from '../services/db';
import { Meta } from './meta';
import { Profile } from './profile';

export class Post extends Model {
    public static tableName = 'post';
    public id: number;
    public author_user_id: number;
    public header: string;
    public content: string;
    public meta: Meta;
    public author: Profile;

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
            author_id: this.author_user_id,
            author: this.author,
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
            author: {
                relation: Model.HasOneRelation,
                modelClass: Profile,
                join: {
                    from: "post.author_user_id",
                    to: "profile.user_id",
                },
            }
        };
    }
}

Post.knex(db);