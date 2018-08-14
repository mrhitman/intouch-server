const tableName = 'channel';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.integer('from').unsigned().notNullable();
    table.integer('to').unsigned().notNullable();
});

exports.down = knex => knex.schema.dropTable(tableName);