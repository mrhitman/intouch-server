import { Model } from "objection";
import { db } from "../services/db";

export enum FriendStatus {
  default = "default",
  banned = "banned",
  muted = "muted"
}

/**
 * User social relation
 */
export class Friend extends Model {
  public static tableName = "friend";
  public user_id: number;
  public friend_user_id: number;
  public status: FriendStatus;

  static get idColumn() {
    return ["user_id", "friend_user_id"];
  }

  static get jsonSchema() {
    const properties = {
      user_id: { type: "integer" },
      friend_user_id: { type: "integer" },
      status: { type: "string" }
    };
    return {
      type: "object",
      properties,
      required: Object.keys(properties),
      additionalProperties: false
    };
  }
}

Friend.knex(db);
