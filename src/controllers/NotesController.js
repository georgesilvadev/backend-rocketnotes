const knex = require("../database/knex"); //importando o knex

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body; //recebe as informações da requisição no body
    const { user_id } = request.params;

    const [note_id] = await knex("notes").insert({
      //armazena o id da nota que acabou de cadastrar
      title, //objetos que queremos incluir
      description,
      user_id,
    });

    const linksInsert = links.map((link) => {
      // vai percorrer cada link
      return {
        note_id,
        url: link, //e vai retornar o note_id e a url
      };
    });

    await knex("links").insert(linksInsert);

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("tags").insert(tagsInsert);

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_at");

    return response.json({
      ...note,
      tags,
      links,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    let notes;

    if(tags){
        const filterTags = tags.split(',').map(tag => tag.trim());

        notes = await knex("tags")
        .select([ //seleciona os campos que quero da tabela
            "notes.id", //sempre buscamos pelo nome da tabela, depois nome do campo
            "notes.title",
            "notes.user_id",
        ])
        .where("notes.user_id", user_id) //para filtar baseado no id do usuário
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.notes_id")

    }else{
        notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }
    return response.json(notes);
  }
}

module.exports = NotesController;
