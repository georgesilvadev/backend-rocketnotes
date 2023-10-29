//Importando o Router de dentro do express
const { Router } = require("express");

const NotesController = require("../controllers/NotesController")

//constante que inicializa o Router
const notesRoutes = Router();

const notesController = new NotesController();

//rota de usuário
notesRoutes.post("/:user_id", notesController.create);

module.exports = notesRoutes;