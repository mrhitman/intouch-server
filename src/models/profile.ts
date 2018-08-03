import * as moment from 'moment';
import { Model } from 'objection';
import { db } from '../services/db';

enum Gender {
    female = 0,
    male = 1,
}

export class Profile extends Model {
    public static tableName = 'profile';
    public user_id: number;
    public first_name: string;
    public middle_name: string;
    public last_name: string;
    public gender: Gender;
    public birthday: number;
    public town: string;
    public relationship: number;
    public company: string;
    public language: string;
    public hobbies: string;
    public priorities: string;
    public quote: string;
    public photo: string;

    toJSON() {
        return {
            name: `${this.first_name} ${this.middle_name}`,
            first_name: this.first_name,
            middle_name: this.middle_name,
            last_name: this.last_name,
            gender: this.gender,
            birthday: moment(this.birthday * 1000).format('YYYY/MMMM/Do'),
            relationship: this.relationship,
            town: this.town,
            company: this.company,
            language: this.language,
            quote: this.quote,
            hobbies: this.hobbies,
            priorities: this.priorities,
        }
    }
}

Profile.knex(db);