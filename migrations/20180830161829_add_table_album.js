const tableName = 'album';

exports.up = knex => knex.schema.createTable(tableName, table => {
    table.string('id').primary();
    table.integer('title');
    table.enum('visibility', ['all', 'friends', 'followers', 'nobody']);
    table.timestamp('created_at');
});

exports.down = knex => knex.schema.dropTable(tableName);