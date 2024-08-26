const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  /**
   * index - GET para listar vários registros.
   * show - para exibir um registro especifico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - DELETE para remover um registro.
   */

  //não precisamos colocar function pois a classe já entende que trata-se de um método/function
  async create(request, response) {
    //copia as duas linhas da rota de users:
    //aqui consigo acessar o body na request, como name, email e password
    const { name, email, password } = request.body;

    //O database é nossa const que conecta com o banco de dados
    const database = await sqliteConnection();
    /*O checkUserExists verifica em nosso banco de dados
     *se o email que está sendo cadastrado já não está sendo utilizado por outro usuário.
     */
    const checkUserExists = await database.get(
      //Selecionando todos os campos onde na tabela do usuário o email seja igual o email que está tentando cadastrar ele retorna o error do if
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );
    //se for verdadeiro ele executa o AppError
    if (checkUserExists) {
      throw new AppError("Este e-mail já está cadastrado em outro usuário.");
    }

    const hashedPassword = await hash(password, 8);

    /*Estamos acessando nosso banco e inserindo dentro da tabela users,
     *nas colunas indicadas entre parenteses os valores passado no body
     */
    await database.run(
      "INSERT INTO users (name, email, password) VALUES(?, ?, ?)",
      [name, email, hashedPassword]
    );

    //Se não ele retorna com o status 201 e um json vazio (por enquanto)
    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError(
        "Hum, parece que esse email já está sendo utilizado por outro usuário."
      );
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "Você informar a senha antiga para definir a nova senha"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Você precisa digitar a senha antiga correta");
      }

      user.password = await hash(password, 8);
    }

    await database.run(`
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
    [user.name, user.email, user.password, user_id]
    );

    return response.json();
  }
}

module.exports = UsersController;
