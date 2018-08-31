const tableName = "friend";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table
      .integer("user_id")
      .unsigned()
      .notNullable();
    table.integer("friend_user_id").notNullable();
    table
      .enum("status", ["default", "banned", "deleted", "muted"])
      .default("default");
    table.unique(["user_id", "friend_user_id"]);
  });

exports.down = knex => knex.schema.dropTable(tableName);
