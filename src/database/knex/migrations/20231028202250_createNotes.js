exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments("id"); //id de cada note criado incrementalmente
    table.text("title"); //titulo da anotação do tipo texto
    table.text("description");//descriçao da anotação do tipo texto
    table.integer("user_id").references("id").inTable("users"); //vinculando o id do usuário com o id criado no users

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("notes");
