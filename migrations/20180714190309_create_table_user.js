const tableName = 'user';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.specificType('id', 'INT').notNullable().primary();
  table.specificType('email', 'VARCHAR(255)').notNullable();
  table.specificType('password', 'VARCHAR(255)').notNullable();
  table.specificType('created_at', 'INT').notNullable();
});

exports.down = knex => knex.dropTable(tableName);