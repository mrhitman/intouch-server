const tableName = 'friend';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
  table.specificType('user_id', 'INT NOT NULL').primary(['user_id', 'friend_user_id']);
  table.specificType('friend_user_id', 'INT NOT NULL');
  table.specificType('deleted', 'SMALLINT NOT NULL');
});

exports.down = knex => knex.dropTable(tableName);