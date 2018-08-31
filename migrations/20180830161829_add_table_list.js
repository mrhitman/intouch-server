const tableName = "list";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.inherits("item");
    table.string("title", 100);
    table.enum("type", ["images", "songs"]);
    table.integer("user_id");
    table.enum("visibility", ["all", "friends", "followers", "nobody"]);
  });

exports.down = knex => knex.schema.dropTable(tableName);
