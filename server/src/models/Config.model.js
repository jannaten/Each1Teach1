const mongoose = require('mongoose');
const { avatars } = require('../data/avatars');
const { toJSON } = require('../utilities/models');
const { languages } = require('../data/localizations');
const { studyCredits } = require('../data/study_credits');
const { languageLevels } = require('../data/language_level');

const configSchema = new mongoose.Schema(
  {
    language_level: {
      type: [Object],
      default: languageLevels
    },
    languages: {
      type: [Object],
      default: languages
    },
    study_credits: {
      type: [Object],
      default: studyCredits
    },
    avatars: {
      type: [String],
      default: avatars
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

configSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    toJSON(returnedObject);
  }
});

module.exports = (context) => context.model('Config', configSchema);
