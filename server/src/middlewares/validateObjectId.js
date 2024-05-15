const mongoose = require('mongoose');
const { createError } = require('./errorHandler');

module.exports = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw createError(404, 'INVALID ID');
  next();
};
