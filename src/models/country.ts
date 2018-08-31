import { Model } from "objection";
import { db } from "../services/db";

export class Country extends Model {
  public static tableName = "country";
  public id: number;
  public name: number;
}

Country.knex(db);
