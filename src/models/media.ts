import { Model } from "objection";
import { db } from "../services/db";
import { Meta } from "./meta";
import { Item } from "./item";

enum MediaType {
  image = "image",
  song = "song",
  document = "document"
}

export class Media extends Item {
  public static tableName = "post";
  public title: string;
  public type: MediaType;
  public meta: Meta;

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      created_at: this.created_at
    };
  }

  static get relationMappings() {
    return {
      meta: {
        relation: Model.HasOneRelation,
        modelClass: Meta,
        join: {
          from: "post.id",
          to: "meta.item_id"
        }
      }
    };
  }
}

Media.knex(db);
