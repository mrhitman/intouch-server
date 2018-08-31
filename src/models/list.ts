import { db } from "../services/db";
import { Item } from "./item";

enum Visibilities {
  all = "all",
  friends = "friends",
  followers = "followers",
  nobody = "nobody"
}

/**
 * Album of images or songs
 */
export class List extends Item {
  public static tableName = "list";
  public id: number;
  public title: string;
  public visibility: Visibilities;
}

List.knex(db);
