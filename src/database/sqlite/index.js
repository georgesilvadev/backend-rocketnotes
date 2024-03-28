/*Vamos fazer a configuração e conexão com o banco de dados
*nesse caso utilizaremos o SQLite um banco de dados relacional.
*/

//importando o sqlite3 que o driver e o sqlite
const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")
/*nossa biblioteca que resolve os endereços dos nossos arquivos 
*de acordo com o ambiente(sistema operacional)
*/
const path = require("path")


async function sqliteConnection(){
    const database = await sqlite.open({
        //nosso objeto que mostra o endereço para salvar nossos arquivos
        filename: path.resolve(__dirname, "..", "database.db"),
        //e agora mostramos qual o driver de conexão.
        driver: sqlite3.Database
    });

    return database;
}

module.exports = sqliteConnection
