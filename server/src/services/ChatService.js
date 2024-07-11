const ChatModel = require('../models/Chat.model');
const { sharedContext } = require('../utilities/dbContext');

class ChatService {
  static getModel = async function () {
    const context = await sharedContext();
    return ChatModel(context);
  };

  getAll = async function (query = {}) {
    return await ChatService.getModel().then((Model) => Model.find(query));
  };

  getById = async function (id) {
    return await ChatService.getModel().then((Model) =>
      Model.findById(id)
        .populate({
          path: 'sender',
          select: 'firstName lastName email avatar images'
        })
        .populate({
          path: 'receiver',
          select: 'firstName lastName email avatar images'
        })
    );
  };

  create = async function (data) {
    const Model = await ChatService.getModel();
    const chat = new Model(data);
    return await chat.save();
  };

  update = async function (id, data) {
    return await ChatService.getModel().then((Model) =>
      Model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        context: 'query'
      })
    );
  };

  delete = async function (id) {
    return await ChatService.getModel().then((Model) =>
      Model.findByIdAndDelete(id)
    );
  };
}

module.exports = ChatService;
