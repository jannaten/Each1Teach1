const mongoose = require('mongoose');
const { toJSON } = require('../utilities/models');

const chatSchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
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
      ref: 'File',
      required: false
    },
    seen: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
      default: []
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
