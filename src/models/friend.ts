import { Model } from 'objection';
import { db } from '../services/db';

export class Friend extends Model {
    public static tableName = 'friend';
    public user_id: number;
    public friend_user_id: number;
    public deleted: number;

    static get idColumn() {
      return ['user_id', 'friend_user_id'];
    }

    static get jsonSchema() {
        const properties = {
          user_id: { type: 'integer' },
          friend_user_id: { type: 'integer' },
          deleted: { enum: [0, 1] }
        };
        return {
          type: 'object',
          properties,
          required: Object.keys(properties),
          additionalProperties: false,
        };
      }
}

Friend.knex(db);