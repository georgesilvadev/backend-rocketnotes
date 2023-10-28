require("express-async-errors")

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
//estamos pegando tudo que tem na pasta express e atribuindo a essa variável
const express = require("express");

const routes = require("./routes");

migrationsRun();

//inicialiando o express na const app e preciso dizer em que porta que ele vai observar
const app = express();
app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)
    
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

//a porta que ele vai ficar observando e esperando requisições
const PORT = 3333;

//fique escutando esse PORT e quando iniciar execute o console.log no terminal
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))