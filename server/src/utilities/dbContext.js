const mongoose = require('mongoose');
const { logger } = require('./logger');
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_APP_DATABASE } = process.env;

const baseUri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@db:27017`;
const options = { authSource: 'admin' };

const connections = {};

const getDbContext = (db) =>
  new Promise((resolve, reject) => {
    if (!(db in connections)) {
      logger.debug(`[dbContext] Creating database connection for db: ${db}`);

      const conn = mongoose.createConnection(`${baseUri}/${db}`, options);

      conn.on('connected', () => {
        logger.debug(`[dbContext] Connected to ${db} succesfully`);
        connections[db] = conn;
        return resolve(conn);
      });
      conn.on('disconnected', () => {
        logger.debug(`[dbContext] Disconnected from ${db} succesfully`);
        delete connections[db];
      });
      conn.on('error', (error) => {
        logger.error(`[dbContext] Error connecting to ${db}:`, error);
        return reject(error);
      });
    } else {
      return resolve(connections[db]);
    }
  });

const sharedContext = async () => {
  const appDatabase = MONGO_APP_DATABASE || 'each1teach1';
  return await getDbContext(appDatabase);
};

module.exports = {
  sharedContext,
  getDbContext
};
