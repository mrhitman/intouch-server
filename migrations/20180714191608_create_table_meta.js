const tableName = "meta";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table
      .integer("item_id")
      .notNullable()
      .primary();
    table.enum("type", ["comment", "image", "post", "song"]);
    table
      .integer("likes")
      .default(0)
      .unsigned()
      .notNullable();
    table
      .integer("dislikes")
      .default(0)
      .unsigned()
      .notNullable();
    table
      .integer("views")
      .default(0)
      .unsigned()
      .notNullable();
    table.timestamp("created_at");
    table.timestamp("updated_at");
  });

exports.down = knex => knex.schema.dropTable(tableName);
