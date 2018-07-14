const tableName = 'profile';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.specificType('user_id', 'INT NOT NULL').primary();
  table.specificType('first_name', 'VARCHAR(255) NOT NULL');
  table.specificType('last_name', 'VARCHAR(255) NOT NULL');
  table.specificType('birthday', 'INT NOT NULL');
  table.specificType('photo', 'VARCHAR(255) NOT NULL');
});

exports.down = knex => knex.dropTable(tableName);
