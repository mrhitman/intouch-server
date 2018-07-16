const tableName = 'group';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.specificType('id', 'INT').notNullable().primary();
  table.specificType('name', 'VARCHAR(255)').notNullable();
  table.specificType('categories', 'VARCHAR(255)').notNullable();
  table.specificType('picture', 'VARCHAR(255)');
  table.specificType('created_at', 'INT').notNullable();
});

exports.down = knex => knex.schema.dropTable(tableName);