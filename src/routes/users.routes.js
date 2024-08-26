//Aqui fica todas as rotas de usuários

//Importando o route de dentro do express.
const { Router } = require("express");

//importar o controller, 2 ponto e barra para sair da pasta routes e poder buscar o arquivo na pasta de controllers:
const UsersController = require("../controllers/UsersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

//Executando Router
const usersRoutes = Router();

//Exemplo de middleware

// function myMiddleware(request, response, next){
//   //exemplo:
//   console.log("Você passou pelo Middleware");

//   //Se for falso, se ele não for admin
//   if (!request.body.isAdmin) {
//     //meu middleware devolve essa mensagem
//     return response.json({ message: "user unauthorized"})
//   }
//   //esse console.log vai aparecer no terminal porém não vai passar para o create, até que chamemos o:
//   next()
// }



//como o UsersController é uma classe, precisamos instanciar ele na memória(nada mais que realocar um espaço em memória):
//criar um cont usersController = new que é uma nova instância UsersController()
const usersController = new UsersController();

//Construção da rota
//Agora no lugar de passar toda essa função, basta colocar usersController.create
//Utilizando Middlewares: agora antes da função create ser chamada, temos o middleware que vai recuperar a requisição, response e next
usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);

module.exports = usersRoutes;