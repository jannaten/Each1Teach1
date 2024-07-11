const ChatModel = require('../models/Chat.model');
const MatchModel = require('../models/Match.model');
const { sharedContext } = require('../utilities/dbContext');

class MatchService {
  static getModel = async function () {
    const context = await sharedContext();
    return MatchModel(context);
  };

  static getChatModel = async function () {
    const context = await sharedContext();
    return ChatModel(context);
  };

  getAll = async function (query = {}) {
    return await MatchService.getModel().then((Model) => Model.find(query));
  };

  getById = async function (id) {
    return await MatchService.getModel().then((Model) => Model.findById(id));
  };

  getExistingMatch = async function (requestUserId, recipientUserId) {
    const Model = await MatchService.getModel();
    return await Model.findOne({
      $or: [
        { requestUser: requestUserId, recipientUser: recipientUserId },
        { requestUser: recipientUserId, recipientUser: requestUserId }
      ]
    });
  };

  getMatchesWithChats = async function (query = {}) {
    const matches = await MatchService.getModel().then((Model) =>
      Model.find(query)
        .populate({
          path: 'requestUser',
          select: 'firstName lastName email avatar lastUserAccess images'
        })
        .populate({
          path: 'recipientUser',
          select: 'firstName lastName email avatar lastUserAccess images'
        })
    );
    const matchIds = matches.map((match) => match._id);
    const chats = await MatchService.getChatModel().then((Chat) =>
      Chat.find({ matchId: { $in: matchIds } })
        .populate({
          path: 'sender',
          select: 'firstName lastName email avatar images'
        })
        .populate({
          path: 'receiver',
          select: 'firstName lastName email avatar images'
        })
    );
    const matchesWithChats = matches.map((match) => {
      const relatedChats = chats.filter(
        (chat) => chat.matchId.toString() === match._id.toString()
      );
      return {
        ...match.toJSON(),
        chats: relatedChats
      };
    });
    return matchesWithChats;
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
