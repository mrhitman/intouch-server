const tableName = 'city';

exports.up = knex => knex.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('name', 255);
    table.integer('country_id');
});

exports.down = knex => knex.schema.dropTable(tableName);