const tableName = 'post';

exports.up = knex => knex.schema.createTable(tableName, table => {
  table.increments('id').primary();
  table.integer('author_id').notNullable();
  table.integer('owner_id').notNullable();
  table.string('header', 255).notNullable();
  table.string('content', 255).notNullable();
});

exports.down = knex => knex.schema.dropTable(tableName);
