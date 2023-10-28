//Importando o Router de dentro do express
const { Router } = require("express");

const UsersController = require("../controllers/UsersController")

//constante que inicializa o Router
const usersRoutes = Router();

const usersController = new UsersController();

//rota de usuário
usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes;