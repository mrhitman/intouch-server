const tableName = "chat_message";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table
      .integer("from_user_id")
      .unsigned()
      .notNullable();
    table
      .integer("to_user_id")
      .unsigned()
      .notNullable();
    table.timestamp("created_at");
    table.boolean("viewed").default(false);
    table.string("text", 500);
  });

exports.down = knex => knex.schema.dropTable(tableName);
