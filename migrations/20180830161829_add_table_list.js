const tableName = "list";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.inherits("item");
    table.integer("title");
    table.enum("visibility", ["all", "friends", "followers", "nobody"]);
  });

exports.down = knex => knex.schema.dropTable(tableName);
