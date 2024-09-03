require("express-async-errors");

const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload")
const migrationsRun = require("./database/sqlite/migrations")
//Importando o express
const express = require("express");
const routes = require("./routes");
migrationsRun();

//Atribuindo o express a nossa variável
const app = express();
app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes);


//error: captura o erro da request
app.use((error, request, response, next) => {
  //primeiro vamos saber se é um erro gerado pelo cliente
  //Se a instância do error for igual do AppError, é um erro do cliente
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      //objeto com status de error
      status: "error",
      //mensagem de erro que criamos no UsersControllers?
      message: error.message,
    });
  }

  //colocamos esse console para que consigamos debugar esse erro
  console.error(error);

  //se não for um erro por parte do cliente, vamos emitir o seguinte erro por padrão:
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

//Definindo uma variável e atribuindo o número da porta
const PORT = 3333;

//Comando para o express ficar sempre lendo a PORT e executando a função que é um console.log
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
