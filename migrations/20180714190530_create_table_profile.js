const tableName = 'profile';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.integer('user_id').notNullable().primary();
  table.string('first_name', 255).notNullable();
  table.string('middle_name', 255).notNullable();
  table.string('last_name', 255);
  table.integer('gender');
  table.integer('relationship');
  table.bigInteger('birthday').unsigned();
  table.string('photo', 255);
  table.string('town', 255);
  table.string('company', 255);
  table.string('language', 255);
  table.string('quote', 255);
  table.string('hobbies', 500);
  table.string('priorities', 500);
});

exports.down = knex => knex.schema.dropTable(tableName);
