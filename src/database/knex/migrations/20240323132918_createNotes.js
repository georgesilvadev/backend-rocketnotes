exports.up = knex => knex.schema.createTable("note", table => {
    table.increments("id"); //o id da nota, que é automático e incremental.
    table.text("title"); //título da nota.
    table.text("description"); //conteúdo da nota.
    table.integer("user_id").references("id").inTable("users"); //Criamos um campo do tipo inteiro na tabela, chamado user_id
    //ele faz referência ao id que existe dentro da tabela do usuário.

    table.timestamp("created_at").default(knex.fn.now()); //O padrão dele é devolver a data e horário de quando uma nota foi criada.
    table.timestamp("updated_at").default(knex.fn.now()); //O padrão dele é devolver a data e horário de quando uma nota foi atualizada.
  });

exports.down = knex => knex.schema.dropTable("note");
