const tableName = 'post';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.integer('id').notNullable().primary();
  table.integer('author_user_id', 'INT').notNullable();
  table.string('header', 255).notNullable();
  table.string('content', 255).notNullable();
});

exports.down = knex => knex.schema.dropTable(tableName);
