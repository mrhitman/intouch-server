import * as moment from "moment";
import { db } from "../services/db";
import { User } from "./user";

enum Gender {
  female = 0,
  male = 1
}

export class Profile extends User {
  public static tableName = "profile";
  public first_name: string;
  public middle_name: string;
  public last_name: string;
  public gender: Gender;
  public birthday: string;
  public home_town: string;
  public city: string;
  public relation: number;
  public country: string;
  public company: string;
  public language: string;
  public books: string;
  public hobbies: string;
  public priorities: string;
  public quote: string;
  public photo: string;

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      created_at: this.created_at,
      profile: {
        name: `${this.first_name} ${this.middle_name}`,
        first_name: this.first_name,
        middle_name: this.middle_name,
        last_name: this.last_name,
        phone: this.phone,
        gender: this.gender,
        birthday: moment(this.birthday).format("Do MMMM YYYY"),
        relation: this.relation,
        home_town: this.home_town,
        city: this.city,
        country: this.country,
        company: this.company,
        language: this.language,
        quote: this.quote,
        books: this.hobbies,
        hobbies: this.hobbies,
        priorities: this.priorities,
        photo: this.photo || "default.png",
        photo_mini: `mini_${this.photo || "default.png"}`
      }
    };
  }
}

Profile.knex(db);
