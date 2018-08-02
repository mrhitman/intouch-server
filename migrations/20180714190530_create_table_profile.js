const tableName = 'profile';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.specificType('user_id', 'INT').notNullable().primary();
  table.specificType('first_name', 'VARCHAR(255)').notNullable();
  table.specificType('middle_name', 'VARCHAR(255)').notNullable();
  table.specificType('last_name', 'VARCHAR(255)').notNullable();
  table.specificType('gender', 'smallint');
  table.specificType('birthday', 'BIGINT');
  table.specificType('photo', 'VARCHAR(255)');
  table.specificType('town', 'VARCHAR(255)');
  table.specificType('company', 'VARCHAR(255)');
  table.specificType('language', 'VARCHAR(255)');
  table.specificType('quote', 'VARCHAR(255)');
  table.specificType('hobbies', 'VARCHAR(500)');
  table.specificType('priorities', 'VARCHAR(500)');
});

exports.down = knex => knex.schema.dropTable(tableName);
