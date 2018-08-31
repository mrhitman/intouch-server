const tableName = "profile";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.inherits("user");
    table.string("first_name", 255).notNullable();
    table.string("middle_name", 255).notNullable();
    table.string("last_name", 255);
    table.integer("gender");
    table.integer("relation");
    table.integer("relation_partner_id");
    table.date("birthday");
    table.string("domain", 255);
    table.string("photo", 255);
    table.string("country", 255);
    table.string("home_town", 255);
    table.string("city", 255);
    table.string("company", 255);
    table.string("language", 255);
    table.string("quote", 255);
    table.string("hobbies", 500);
    table.string("books", 500);
    table.string("priorities", 500);
  });

exports.down = knex => knex.schema.dropTable(tableName);
