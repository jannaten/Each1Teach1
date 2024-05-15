const {
  MONGO_USERNAME: user,
  MONGO_PASSWORD: pw,
  MONGO_APP_DATABASE: db
} = process.env;

module.exports = {
  dbConnectionUri: `mongodb://${user}:${pw}@db/${
    db || 'each1teach1'
  }?authSource=admin`
};
