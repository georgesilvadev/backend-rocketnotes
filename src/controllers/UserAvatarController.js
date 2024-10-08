const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilname = request.file.filename;

    const user = await knex("users").where({ id: user_id }).first();
    const diskStorage = new DiskStorage();

    if (!user) {
      throw new AppError(
        "Somente usuários autenticados podem alterar o avatar",
        401
      );
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFilname);
    user.avatar = filename;

    await knex("users").update(user).where({ id: user.id });

    return response.json(user);
  }
}

module.exports = UserAvatarController;
