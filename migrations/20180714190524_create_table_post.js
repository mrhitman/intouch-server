const tableName = 'post';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.specificType('id', 'INT NOT NULL').primary();
  table.specificType('author_user_id', 'INT NOT NULL');
  table.specificType('header', 'VARCHAR(255) NOT NULL');
  table.specificType('content', 'VARCHAR(255) NOT NULL');
});

exports.down = knex => knex.dropTable(tableName);
