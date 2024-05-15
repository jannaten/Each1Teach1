const UserModel = require('../models/User.model');
const { sharedContext } = require('../utilities/dbContext');

class UserService {
  static getModel = async function () {
    const context = await sharedContext();
    return UserModel(context);
  };

  getAll = async function (query = {}) {
    return await UserService.getModel().then((Model) => Model.find(query));
  };

  getById = async function (id) {
    return await UserService.getModel().then((Model) => Model.findById(id));
  };

  getByEmail = async function (userEmail) {
    return await UserService.getModel().then((Model) =>
      Model.findOne({
        email: userEmail
      })
    );
  };

  create = async function (data) {
    const Model = await UserService.getModel();
    const user = new Model(data);
    return await user.save();
  };

  update = async function (id, data) {
    return await UserService.getModel().then((Model) =>
      Model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        context: 'query'
      })
    );
  };

  delete = async function (id) {
    return await UserService.getModel().then((Model) =>
      Model.findByIdAndDelete(id)
    );
  };
}

module.exports = UserService;
