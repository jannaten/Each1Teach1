const MatchModel = require('../models/Match.model');
const { sharedContext } = require('../utilities/dbContext');

class MatchService {
  static getModel = async function () {
    const context = await sharedContext();
    return MatchModel(context);
  };

  getAll = async function (query = {}) {
    return await MatchService.getModel().then((Model) => Model.find(query));
  };

  getById = async function (id) {
    return await MatchService.getModel().then((Model) => Model.findById(id));
  };

  findExistingMatch = async function (requestUserId, recipientUserId) {
    const Model = await MatchService.getModel();
    return await Model.findOne({
      $or: [
        { requestUser: requestUserId, recipientUser: recipientUserId },
        { requestUser: recipientUserId, recipientUser: requestUserId }
      ]
    });
  };

  create = async function (data) {
    const Model = await MatchService.getModel();
    const match = new Model(data);
    return await match.save();
  };

  update = async function (id, data) {
    return await MatchService.getModel().then((Model) =>
      Model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        context: 'query'
      })
    );
  };

  delete = async function (id) {
    return await MatchService.getModel().then((Model) =>
      Model.findByIdAndDelete(id)
    );
  };
}

module.exports = MatchService;
