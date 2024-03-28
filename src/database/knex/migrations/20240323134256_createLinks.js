exports.up = knex => knex.schema.createTable("links", table => {
    table.increments("id");
    table.text("url").notNullable(); //Obrigatório que o campo nome não pode ser nulo.
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");//O onDelete é uma função que se a nota for excluída o link também será.
    table.timestamp("created_at").default(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable("links");
