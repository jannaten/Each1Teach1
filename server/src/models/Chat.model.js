const mongoose = require('mongoose');
const { toJSON } = require('../utilities/models');

const chatSchema = new mongoose.Schema(
  {
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    attachment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File'
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

chatSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    toJSON(returnedObject);
  }
});

module.exports = (context) => context.model('Chat', chatSchema);
