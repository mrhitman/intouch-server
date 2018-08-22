const tableName = 'user';

exports.up = knex => knex.schema.createTable(tableName, table => {
  table.increments('id').primary();
  table.string('email', 255).notNullable().unique();
  table.string('phone', 20).unique();
  table.string('password', 255).notNullable();
  table.timestamp('created_at');
});

exports.down = knex => knex.schema.dropTable(tableName);