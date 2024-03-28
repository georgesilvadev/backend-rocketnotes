//A missão desse arquivo é reunir todas as rotas da nossa aplicação

//Importar o Router do express
const { Router } = require("express")

//importando o userRoutes
const usersRoutes = require("./users.routes")
const notesRoutes = require("./notes.routes")

//inicialização do Router
const routes = Router();

//Quando foi solicitado o caminho /users, utilizar a rota usersRoutes
routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);

module.exports = routes;