const tableName = 'meta';

exports.up = knex => knex.schema.alterTable(tableName, table => {
    table.integer('dislikes').default(0).notNullable();
});

exports.down = knex => knex.schema.alterTable(tableName, table => {
    table.dropColumn('dislikes');
});