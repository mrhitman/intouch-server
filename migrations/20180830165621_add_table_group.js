const tableName = 'group';

exports.up = knex => knex.schema.createTable(tableName, table => {
    table.string('id').primary();
    table.integer('title');
    table.enum('type', ['page', 'group', 'business', 'community', 'schedule']);
    table.integer('description');
    table.integer('image_id');
    table.timestamp('created_at');
});

exports.down = knex => knex.schema.dropTable(tableName);