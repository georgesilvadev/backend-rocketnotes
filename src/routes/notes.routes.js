//Importando o Router de dentro do express
const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

//constante que inicializa o Router
const notesRoutes = Router();

const notesController = new NotesController();

//rota de usuário
notesRoutes.get("/", notesController.index);
notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;
