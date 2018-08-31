import { Model } from "objection";
import { db } from "../services/db";

/**
 * Basic entry
 */
export class Item extends Model {
  public static tableName = "item";
  public id: number;
  public created_at: string;
}

Item.knex(db);
