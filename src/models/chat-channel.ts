import { Model } from "objection";
import { db } from "../services/db";
import { Profile } from "./profile";

export class ChatChannel extends Model {
  public static tableName = "chat_channel";
  public id: number;
  public from: number;
  public to: number;
  public interlocutor: Profile;

  toJSON() {
    return {
      id: this.to,
      name: `${this.interlocutor.first_name} ${this.interlocutor.last_name}`,
      photo: this.interlocutor.photo || "default.png"
    };
  }

  static get relationMappings() {
    return {
      interlocutor: {
        relation: Model.HasOneRelation,
        modelClass: Profile,
        join: {
          from: "channel.to",
          to: "profile.user_id"
        }
      }
    };
  }
}

ChatChannel.knex(db);
