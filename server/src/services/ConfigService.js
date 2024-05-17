const ConfigModel = require('../models/Config.model');
const { sharedContext } = require('../utilities/dbContext');

class ConfigService {
  static getModel = async function () {
    const context = await sharedContext();
    return ConfigModel(context);
  };

  getAll = async function () {
    return await ConfigService.getModel().then((Model) => Model.find());
  };

  create = async function (data) {
    const Model = await ConfigService.getModel();
    const config = new Model(data);
    return await config.save();
  };
}

module.exports = ConfigService;
