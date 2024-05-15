const AnalyticModel = require('../models/AnalyticLog.model');
const { sharedContext } = require('../utilities/dbContext');
const { createMD5 } = require('../utilities/crypto');

class AnalyticService {
  getModel = async function () {
    const context = await sharedContext();
    return AnalyticModel(context);
  };

  getAll = async function () {
    return await this.search();
  };

  search = async function (filter = {}) {
    const AnalyticLog = await this.getModel();
    return await AnalyticLog.find(filter);
  };

  eventLog = async function (eventType, path = '', data = {}) {
    const AnalyticLog = await this.getModel();
    let log = new AnalyticLog({
      eventType,
      path,
      data
    });
    return await log.save();
  };

  visitorLog = async function (path, remoteIp, userAgent) {
    const AnalyticLog = await this.getModel();
    const date = new Date();

    let log = await AnalyticLog.findOne({
      eventType: 'visitSite',
      createdAt: {
        $gte: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          0,
          0,
          0,
          0
        ),
        $lte: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          23,
          59,
          59,
          999
        )
      },
      path: path
    });

    const visitorHash = createMD5(remoteIp + userAgent);

    if (log) {
      return await AnalyticLog.findByIdAndUpdate(
        log.id,
        {
          data: {
            count: log.data.count + 1,
            remoteIps: log.data.remoteIps.includes(remoteIp)
              ? log.data.remoteIps
              : log.data.remoteIps.concat(remoteIp),
            visitorHashes: (log.data.visitorHashes || []).includes(visitorHash)
              ? log.data.visitorHashes
              : (log.data.visitorHashes || []).concat(visitorHash)
          }
        },
        {
          new: true
        }
      );
    } else {
      return await this.eventLog('visitSite', path, {
        count: 1,
        remoteIps: [remoteIp],
        visitorHashes: [visitorHash]
      });
    }
  };

  getMostPopularRealizations = async function (organization, limit = 10) {
    const Analytics = await this.getModel();

    const popular = await Analytics.aggregate([
      {
        $match: {
          eventType: 'enrollmentClick',
          path: {
            $regex: organization.path,
            $options: 'i'
          }
        }
      },
      {
        $group: {
          _id: '$data.realization',
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          count: -1
        }
      },
      {
        $limit: isNaN(limit) ? 10 : Number(limit)
      }
    ]);

    return popular;
  };
}

module.exports = AnalyticService;
