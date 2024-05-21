const NewsModel = require('../models/News.model');
const UserModel = require('../models/User.model');

class NewsService {
  constructor(context) {
    this.context = context;
    this.User = UserModel(context);
    this.News = NewsModel(context);
  }

  getAll = async function (query = {}) {
    const limit = query.limit || 0;
    return await this.News.find()
      .populate('author', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit);
  };

  getById = async function (id) {
    return await this.News.findById(id)
      .populate('author', 'firstName lastName')
      .sort({ createdAt: -1 });
  };

  create = async function (data) {
    const news = await this.News.create(data);
    return await this.News.findById(news.id)
      .populate('author', 'firstName lastName')
      .sort({ createdAt: -1 });
  };

  update = async function (id, data) {
    return await this.News.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      context: 'query'
    });
  };

  delete = async function (id) {
    return await this.News.findByIdAndDelete(id);
  };
}

module.exports = NewsService;
