import { Model } from 'objection';
import { db } from '../services/db';
import { Profile } from './profile';

export class User extends Model {
    public static tableName = 'user';
    public id: number;
    public email: string;
    public password: string;
    public profile: Profile;

    static get relationMapping() {
        return {
            profile: {
                relation: Model.HasOneRelation,
                modelClass: Profile,
                join: {
                    from: "user.id",
                    to: "profile.user_id",
                },
            },
        };
    }
}

User.knex(db);