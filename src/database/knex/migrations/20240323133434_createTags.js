exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id");
    table.text("name").notNullable(); //notNullabel deixar o campo obrigatório para ser preenchido
    //O onDelete é uma função que se a nota for excluída a tag também será.
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
  });

exports.down = knex => knex.schema.dropTable("tags");
