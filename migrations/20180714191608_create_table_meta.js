const tableName = 'meta';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.specificType('item_id', 'INT NOT NULL').primary();
  table.specificType('likes', 'INT NOT NULL');
  table.specificType('views', 'INT NOT NULL');
  table.specificType('created_at', 'INT NOT NULL');
  table.specificType('updated_at', 'INT NOT NULL');
});

exports.down = knex => knex.dropTable(tableName);