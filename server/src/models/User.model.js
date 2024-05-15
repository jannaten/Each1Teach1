const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { createMD5 } = require('../utilities/crypto');
const { toJSON } = require('../utilities/models');

const languageSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  level: {
    type: String,
    enum: ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'],
    required: true
  }
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return value.endsWith('@tuni.fi');
        },
        message: 'Email must be from @tuni.fi domain'
      }
    },
    password: {
      type: String,
      required: true
    },
    description: {
      type: String,
      maxlength: 200
    },
    roles: {
      type: [String],
      enum: ['superuser', 'student', 'teacher'],
      default: ['student']
    },
    active: {
      type: Boolean,
      default: false
    },
    lastUserAccess: {
      type: Date,
      default: Date.now
    },
    images: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File'
    },
    languages_to_learn: [languageSchema],
    languages_for_teach: [languageSchema],
    deletedAt: {
      type: Date,
      default: null
    },
    contentHash: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    toJSON(returnedObject);
  }
});

function createContentHash(next) {
  const { active, firstName, lastName, email } = this._doc;
  const loginName = `${firstName} ${lastName}`;
  this.contentHash = createMD5({
    active,
    firstName,
    lastName,
    email,
    loginName
  });
  next();
}

function updateContentHash(next) {
  const update = this.getUpdate();
  const { active, firstName, lastName, email } = update;
  const loginName = `${firstName} ${lastName}`;
  update.contentHash = createMD5({
    active,
    firstName,
    lastName,
    email,
    loginName
  });
  next();
}

userSchema
  .pre('save', createContentHash)
  .pre('update', updateContentHash)
  .pre('findOneAndUpdate', updateContentHash);

userSchema.methods.compareContentHash = function (content) {
  const { active, firstName, lastName, email } = content;
  const loginName = `${firstName} ${lastName}`;
  const hash = createMD5({
    active,
    firstName,
    lastName,
    email,
    loginName
  });
  return this.contentHash === hash;
};

userSchema.virtual('isSuperuser').get(function () {
  return this.roles.includes('superuser');
});

userSchema.methods.hasRole = function (role) {
  return this.roles.includes(role);
};

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    toJSON(returnedObject);
    delete returnedObject.password;
    delete returnedObject.contentHash;
  }
});

userSchema.plugin(uniqueValidator, {
  message: '{PATH} should be unique'
});

module.exports = (context) => context.model('User', userSchema);
