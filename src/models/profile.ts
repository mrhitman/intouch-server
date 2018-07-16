import { Model } from 'objection';
import { db } from '../services/db';
import * as moment from 'moment';

export class Profile extends Model {
    public static tableName = 'profile';
    public user_id: number;
    public first_name: string;
    public last_name: string;
    public birthday: number;
    public town: string;
    public company: string;
    public language: string;
    public quote: string;
    public photo: string;

    toJSON() {
        return {
            name: `${this.first_name} ${this.last_name}`,
            first_name: this.first_name,
            last_name: this.last_name,
            birthday: moment(this.birthday * 1000).format('YYYY/MMMM/Do'),
            town: this.town,
            company: this.company,
            language: this.language,
            quote: this.quote,
        }
    }
}

Profile.knex(db);