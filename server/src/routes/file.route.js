const router = require('express').Router();
const FileService = require('../services/FileService');
const { createError } = require('../middlewares/errorHandler');
const asyncErrorHandler = require('../middlewares/asyncMiddleware');

router.get(
  '/:id',
  asyncErrorHandler(async (req, res) => {
    const fileService = new FileService(req.dbContext);
    const fileData = await fileService.getById(req.params.id);
    if (!fileData) throw createError(404, 'file not found');
    const { file, data } = fileData;
    res.set('Content-Type', file.mimeType);
    res.send(data);
  })
);

module.exports = router;
