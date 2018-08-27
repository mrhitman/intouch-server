const tableName = 'group';

exports.up = knex => knex.schema.createTable(tableName, table => {
  table.integer('id', 'INT').notNullable().primary();
  table.string('name', 255).notNullable();
  table.string('categories', 255).notNullable();
  table.string('picture', 255);
  table.timestamp('created_at');
});

exports.down = knex => knex.schema.dropTable(tableName);