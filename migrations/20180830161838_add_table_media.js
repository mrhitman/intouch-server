const tableName = "media";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.inherits("item");
    table.string("title");
    table.enum("type", ["image", "song", "document"]);
    table.integer("list_id");
  });

exports.down = knex => knex.schema.dropTable(tableName);
