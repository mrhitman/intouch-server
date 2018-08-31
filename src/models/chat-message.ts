import { Model } from "objection";
import { db } from "../services/db";

export class ChatMessage extends Model {
  public static tableName = "message";
  public id: number;
  public from: number;
  public to: number;
  public created_at;
  public viewed: boolean;
  public text: string;
}

ChatMessage.knex(db);
