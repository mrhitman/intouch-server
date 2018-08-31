import { db } from "../services/db";
import { Item } from "./item";

export enum Visibilities {
  all = "all",
  friends = "friends",
  followers = "followers",
  nobody = "nobody"
}

export enum ListType {
  images = "images",
  songs = "songs"
}

/**
 * Album of images or songs
 */
export class List extends Item {
  public static tableName = "list";
  public id: number;
  public user_id: number;
  public title: string;
  public type: ListType;
  public visibility: Visibilities;
}

List.knex(db);
