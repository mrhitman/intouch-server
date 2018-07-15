const tableName = 'meta';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.specificType('item_id', 'INT').notNullable().primary();
  table.specificType('likes', 'INT').notNullable();
  table.specificType('views', 'INT').notNullable();
  table.specificType('created_at', 'INT').notNullable();
  table.specificType('updated_at', 'INT').notNullable();
});

exports.down = knex => knex.dropTable(tableName);