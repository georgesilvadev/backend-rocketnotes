const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    //https://www.notion.so/Explica-o-desse-peda-o-de-c-digo-73072e75b9ca49ce954dd17cf2e53e86?pvs=4
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id
    });

    //https://www.notion.so/Explica-o-dessa-parte-do-c-digo-19ed836f04be4880bb37379ce4854048?pvs=4
    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      };
    });

    await knex("links").insert(linksInsert);

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      };
    });

    await knex("tags").insert(tagsInsert);

    response.json();
  }

  async show (request, response){
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links").where({ note_id: id }).orderBy("created_at");

    return response.json({
      ...note,
      tags,
      links
    })
  }
}

module.exports = NotesController;
