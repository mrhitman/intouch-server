const tableName = 'post';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.specificType('id', 'INT').notNullable().primary();
  table.specificType('author_user_id', 'INT').notNullable();
  table.specificType('header', 'VARCHAR(255)').notNullable();
  table.specificType('content', 'VARCHAR(255)').notNullable();
});

exports.down = knex => knex.dropTable(tableName);
