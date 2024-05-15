const AnalyticService = require('../services/demo/AnalyticService');
const { logger } = require('../utilities/logger');
const { resolveRemoteIp } = require('../utilities/request');

const analyticService = new AnalyticService();

const visitorLogger = async (req, res, next) => {
  try {
    if (!req.path.startsWith('/api')) {
      await analyticService.visitorLog(
        req.path,
        resolveRemoteIp(req),
        req.get('user-agent')
      );
    }
  } catch (error) {
    logger.error(error);
  } finally {
    next();
  }
};

module.exports = {
  visitorLogger
};
