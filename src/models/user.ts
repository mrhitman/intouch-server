import { Model } from "objection";
import { db } from "../services/db";

enum DeactivatedStatus {
  deleted = "deleted",
  banned = "banned"
}

export class User extends Model {
  public static tableName = "user";
  public id: number;
  public email: string;
  public phone: string;
  public password: string;
  public deactivated: DeactivatedStatus;
  public created_at: string;
}

User.knex(db);
