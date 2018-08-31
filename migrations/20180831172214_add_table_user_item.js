const tableName = "user_item";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.integer("id").primary();
    table.integer("user_id");
  });

exports.down = knex => knex.schema.dropTable(tableName);
