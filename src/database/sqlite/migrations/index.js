/* Vamos deixar nossa criação de tabelas automatizada no nosso código 
*utilizando a estratégia de Migations.
*/

//importando o sqliteConnection responsável por conectar com nosso banco
const sqliteConnection = require("../../sqlite");
//importando para cá o comando para criação de tabela
const createUsers = require("./createUsers");

//função que vai executar nossas migrations
async function migrationsRun() {
    //schemas se refere a nossas tabelas
    //a parte do vetor não entendi
    const schemas = [createUsers].join(" ");
    sqliteConnection()
        // está executando os schemas que seriam as migrations
        .then(db => db.exec(schemas))
        //tratando erros
        .catch(error => console.error(error));
}

module.exports = migrationsRun;