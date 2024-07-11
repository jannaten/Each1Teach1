const fs = require('fs');
const FileModel = require('../models/File.model');
const UserModel = require('../models/User.model');

class FileService {
  constructor(context) {
    this.context = context;
    this.User = UserModel(context);
    this.File = FileModel(context);
    this.path = `${process.env.SERVER_UPLOAD_PATH || '/app/files'}/${
      context.name
    }`;

    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path, { recursive: true });
    }
  }

  getById = async function (id) {
    const file = await this.File.findById(id);
    if (!file || !fs.existsSync(`${this.path}/${id}`)) {
      return null;
    }
    const data = fs.readFileSync(`${this.path}/${id}`);
    return {
      file,
      data
    };
  };

  create = async function (fileData) {
    let file = new this.File({
      fileId: fileData.fileId,
      fileName: fileData.name,
      mimeType: fileData.mimetype
    });
    file = await file.save();

    fs.writeFileSync(`${this.path}/${file.id}`, fileData.data);
    return file;
  };

  delete = async function (fileId) {
    const file = await this.File.findByIdAndDelete(fileId);
    fs.unlink(`${this.path}/${fileId}`, function (err, result) {
      if (err) console.log('error', err);
    });
    return file;
  };
}

module.exports = FileService;
