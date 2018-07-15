const tableName = 'friend';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.specificType('user_id', 'INT').notNullable();
  table.specificType('friend_user_id', 'INT').notNullable();
  table.specificType('deleted', 'SMALLINT').notNullable();
  table.unique(['user_id', 'friend_user_id']);
});

exports.down = knex => knex.dropTable(tableName);