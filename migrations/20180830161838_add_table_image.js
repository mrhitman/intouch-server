const tableName = 'image';

exports.up = knex => knex.schema.createTable(tableName, table => {
    table.string('id').primary();
    table.integer('title');
    table.integer('album_id');
    table.timestamp('created_at');
});

exports.down = knex => knex.schema.dropTable(tableName);