//Importando o Router de dentro do express
const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

//constante que inicializa o Router
const tagsRoutes = Router();

const tagsController = new TagsController();

//rota de usuário
tagsRoutes.get("/:user_id", tagsController.index);

module.exports = tagsRoutes;
