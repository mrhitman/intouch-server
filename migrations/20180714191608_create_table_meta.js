const tableName = 'meta';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.integer('item_id').notNullable().primary();
  table.integer('likes').default(0).notNullable();
  table.integer('views').default(0).notNullable();
  table.bigInteger('created_at').unsigned().notNullable();
  table.bigInteger('updated_at').unsigned().notNullable();
});

exports.down = knex => knex.schema.dropTable(tableName);