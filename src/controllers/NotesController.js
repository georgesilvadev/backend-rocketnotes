const knex = require("../database/knex") //importando o knex

class NotesController{
    async create(request, response){
        const {title, description, tags, links} = request.body; //recebe as informações da requisição no body
        const { user_id } = request.params;

        const [ note_id ] = await knex("notes").insert({ //armazena o id da nota que acabou de cadastrar
            title, //objetos que queremos incluir
            description,
            user_id,
        })

        const linksInsert = links.map(link => { // vai percorrer cada link
            return{
                note_id,
                url: link //e vai retornar o note_id e a url
            }
        })

        await knex("links").insert(linksInsert)

        const tagsInsert = tags.map(name => {
            return{
                note_id,
                name,
                user_id
            }
        })

        await knex("tags").insert(tagsInsert)

        response.json()
    }
}

module.exports = NotesController;