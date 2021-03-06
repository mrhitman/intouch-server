const tableName = "comment";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.inherits("item");
    table.integer("to_item_id");
    table.string("text", 255);
  });

exports.down = knex => knex.schema.dropTable(tableName);
