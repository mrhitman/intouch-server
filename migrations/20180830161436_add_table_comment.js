const tableName = 'comment';

exports.up = knex => knex.schema.createTable(tableName, table => {
    table.string('id').primary();
    table.integer('to_item_id');
    table.string('text', 255);
    table.timestamp('created_at');
});

exports.down = knex => knex.schema.dropTable(tableName);