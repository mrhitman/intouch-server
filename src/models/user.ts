import { Model } from 'objection';
import { db } from '../services/db';
import { Profile } from './profile';
import { Friend } from './friend';

export class User extends Model {
    public static tableName = 'user';
    public id: number;
    public email: string;
    public password: string;
    public profile: Profile;

    static get relationMappings() {
        return {
            profile: {
                relation: Model.HasOneRelation,
                modelClass: Profile,
                join: {
                    from: "user.id",
                    to: "profile.user_id",
                },
            }
        };
    }
}

User.knex(db);