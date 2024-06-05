const mongoose = require('mongoose');
const { toJSON } = require('../utilities/models');

function validateDifferentUsers(requestUserId, recipientUserId) {
  return requestUserId.toString() !== recipientUserId.toString();
}

const matchSchema = new mongoose.Schema(
  {
    requestUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: function (value) {
          return validateDifferentUsers(value, this.recipientUser);
        },
        message: 'Request user and recipient user cannot be the same.'
      }
    },
    recipientUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    matchStartDate: {
      type: Date,
      default: Date.now
    },
    matchEndDate: {
      type: Date
    },
    active: {
      type: Boolean,
      default: true
    },
    status: {
      type: [String],
      enum: ['approved', 'rejected', 'pending'],
      default: ['pending']
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

matchSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    toJSON(returnedObject);
  }
});

module.exports = (context) => context.model('Match', matchSchema);
