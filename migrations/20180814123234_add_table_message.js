const tableName = 'message';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.integer('from').unsigned().notNullable();
    table.integer('to').unsigned().notNullable();
    table.timestamp('created_at');
    table.boolean('viewed').default(false);
    table.string('text', 500);
});

exports.down = knex => knex.schema.dropTable(tableName);