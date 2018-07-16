const tableName = 'meta';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.specificType('item_id', 'INT').notNullable().primary();
  table.specificType('likes', 'INT').default(0).notNullable();
  table.specificType('views', 'INT').default(0).notNullable();
  table.specificType('created_at', 'INT').notNullable();
  table.specificType('updated_at', 'INT').notNullable();
});

exports.down = knex => knex.schema.dropTable(tableName);