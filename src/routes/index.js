//A missão desse arquivo é reunir todas as rotas da nossa aplicação

//Importar o Router do express
const { Router } = require("express")

//importando o userRoutes
const tagsRoutes = require("./tags.routes")
const notesRoutes = require("./notes.routes")
const usersRoutes = require("./users.routes")
const sessionsRoutes = require("./sessions.routes")

//inicialização do Router
const routes = Router();

//Quando foi solicitado o caminho /users, utilizar a rota usersRoutes
routes.use("/tags", tagsRoutes);
routes.use("/notes", notesRoutes);
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;