const tableName = 'meta';

exports.up = knex => knex.schema.createTable(tableName, table => {
  table.integer('item_id').notNullable().primary();
  table.integer('likes').default(0).notNullable();
  table.integer('dislikes').default(0).notNullable();
  table.integer('views').default(0).notNullable();
  table.timestamp('created_at');
  table.timestamp('updated_at');
});

exports.down = knex => knex.schema.dropTable(tableName);