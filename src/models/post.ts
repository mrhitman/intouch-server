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
            profile: {
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