const router = require('express').Router();
const cors = require('cors');
const { resolveRemoteIp } = require('../utilities/request');
const AnalyticService = require('../services/AnalyticService');
const { createError } = require('../middlewares/errorHandler');
const asyncErrorHandler = require('../middlewares/asyncMiddleware');

const analyticService = new AnalyticService();

const corsOptions = {
  origin: (origin, callback) => {
    if (origin === process.env.SERVER_DOMAIN) {
      callback(null, true);
    } else {
      callback(createError(400, 'cors.not.allowed'));
    }
  }
};

router.post(
  '/',
  cors(corsOptions),
  asyncErrorHandler(async (req, res) => {
    const { eventType, path, data } = req.body;
    await analyticService.eventLog(eventType, path, {
      remoteIp: resolveRemoteIp(req),
      ...data
    });
    res.send('event.logged');
  })
);

module.exports = router;
