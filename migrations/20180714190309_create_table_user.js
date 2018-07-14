const tableName = 'user';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.specificType('id', 'INT NOT NULL').primary();
  table.specificType('email', 'VARCHAR(255) NOT NULL');
  table.specificType('password', 'VARCHAR(255) NOT NULL');
  table.specificType('created_at', 'INT NOT NULL');
});

exports.down = knex => knex.dropTable(tableName);