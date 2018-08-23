import { Model } from 'objection';
import { db } from '../services/db';
import { Profile } from './profile';

enum DeactivatedStatus {
    deleted = 'deleted',
    banned = 'banned',
}

export class User extends Model {
    public static tableName = 'user';
    public id: number;
    public email: string;
    public phone: string;
    public password: string;
    public profile: Profile;
    public deactivated: DeactivatedStatus;
    public created_at: string;

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            phone: this.phone,
            created_at: this.created_at,
            profile: this.profile
        }
    }

    static get relationMappings() {
        return {
            profile: {
                relation: Model.HasOneRelation,
                modelClass: Profile,
                join: {
                    from: 'user.id',
                    to: 'profile.user_id',
                },
            }
        };
    }
}

User.knex(db);