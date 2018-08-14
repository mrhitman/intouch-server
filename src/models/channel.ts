import { Model } from 'objection';
import { db } from '../services/db';
import { Profile } from './profile';

export class Channel extends Model {
    public static tableName = 'channel';
    public id: number;
    public from: number;
    public to: number;

    static get relationMappings() {
        return {
            interlocutor: {
                relation: Model.HasOneRelation,
                modelClass: Profile,
                join: {
                    from: 'channel.to',
                    to: 'profile.user_id',
                }
            }
        };
    }
}

Channel.knex(db);
