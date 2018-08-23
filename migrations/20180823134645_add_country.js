const tableName = 'country';

exports.up = knex => knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('name', 255);
});

exports.down = knex => knex.schema.dropTable(tableName);