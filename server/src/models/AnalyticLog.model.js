const mongoose = require('mongoose');
const { toJSON } = require('../utilities/models');

const analyticSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      required: [true, 'analyticLog.{PATH}.required']
    },
    path: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

analyticSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    toJSON(returnedObject);
    delete returnedObject.updatedAt;
  }
});

module.exports = (context) => context.model('Analytics', analyticSchema);
