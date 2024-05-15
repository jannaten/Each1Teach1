const ChannelModel = require('../models/Channel.model');
const { sharedContext } = require('../utilities/dbContext');

class ChannelService {
  static getModel = async function () {
    const context = await sharedContext();
    return ChannelModel(context);
  };

  getAll = async function (query = {}) {
    return await ChannelService.getModel().then((Model) => Model.find(query));
  };

  getById = async function (id) {
    return await ChannelService.getModel().then((Model) => Model.findById(id));
  };

  create = async function (data) {
    const Model = await ChannelService.getModel();
    const channel = new Model(data);
    return await channel.save();
  };

  update = async function (id, data) {
    return await ChannelService.getModel().then((Model) =>
      Model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        context: 'query'
      })
    );
  };

  delete = async function (id) {
    return await ChannelService.getModel().then((Model) =>
      Model.findByIdAndDelete(id)
    );
  };
}

module.exports = ChannelService;
