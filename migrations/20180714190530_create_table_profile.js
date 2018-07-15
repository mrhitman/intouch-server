const tableName = 'profile';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.specificType('user_id', 'INT').notNullable().primary();
  table.specificType('first_name', 'VARCHAR(255)').notNullable();
  table.specificType('last_name', 'VARCHAR(255)').notNullable();
  table.specificType('birthday', 'INT').notNullable();
  table.specificType('photo', 'VARCHAR(255)').notNullable();
});

exports.down = knex => knex.dropTable(tableName);
