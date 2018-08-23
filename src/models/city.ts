import { Model } from 'objection';
import { db } from '../services/db';
import { Country } from './country';

export class City extends Model {
    public static tableName = 'city';
    public id: number;
    public name: number;
    public country_id: number;
    public country: Country;
    public updated_at: string;

    public get relationMapping() {
        return {
            city: {
                relation: Model.HasOneRelation,
                modelClass: Country,
                join: {
                    from: 'city.country_id',
                    to: 'country.id',
                }
            }
        }
    }
}

Country.knex(db);