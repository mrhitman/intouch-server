const tableName = "item";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table.timestamp("created_at");
  });

exports.down = knex => knex.schema.dropTable(tableName);
