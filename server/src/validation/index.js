const Joi = require('joi');
const { emailDomains } = require('../data/emailDomains');
const {
  getEmailDomainRegex,
  formatDomainList
} = require('../utilities/email-helper');

const userValidationSchema = Joi.object({
  firstName: Joi.string().required().max(50),
  lastName: Joi.string().required().max(50),
  email: Joi.string()
    .required()
    .email({ multiple: true })
    .regex(getEmailDomainRegex(emailDomains))
    .message(
      `Email must be from an approved educational institution. Allowed domains are: ${formatDomainList(
        emailDomains
      )}`
    ),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)
    .message(
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be 8-20 characters long.'
    ),
  description: Joi.string().min(0).max(200).default(''),
  roles: Joi.array()
    .items(Joi.string().valid('superuser', 'teacher', 'student'))
    .unique(),
  avatar: Joi.array()
    .items(
      Joi.string().valid('beam', 'marble', 'pixel', 'sunset', 'ring', 'bauhaus')
    )
    .unique(),
  active: Joi.boolean(),
  approved: Joi.boolean(),
  expiresAt: Joi.date(),
  lastUserAccess: Joi.date(),
  images: Joi.any(),
  languages_to_learn: Joi.array()
    .items(
      Joi.object({
        language: Joi.string().required(),
        credits: Joi.number().required().min(1).max(5),
        level: Joi.string().valid('a1', 'a2', 'b1', 'b2', 'c1', 'c2').required()
      })
    )
    .unique(),
  languages_for_teach: Joi.array()
    .items(
      Joi.object({
        language: Joi.string().required(),
        credits: Joi.number().required().min(1).max(5),
        level: Joi.string().valid('a1', 'a2', 'b1', 'b2', 'c1', 'c2').required()
      })
    )
    .unique()
}).custom((value, helper) => {
  const { languages_to_learn, languages_for_teach } = value;
  if (languages_for_teach?.length > 0 && languages_to_learn?.length > 0) {
    const learnLanguages = languages_to_learn.map((lang) => lang.language);
    const teachLanguages = languages_for_teach.map((lang) => lang.language);
    const duplicates = learnLanguages.some((lang) =>
      teachLanguages.includes(lang)
    );
    if (duplicates) {
      return helper.message(
        "A language cannot be in both 'languages_to_learn' and 'languages_for_teach'"
      );
    }
    return value;
  }
  return value;
});

const userPatchSchema = Joi.object({
  id: Joi.any(),
  firstName: Joi.string().max(50),
  lastName: Joi.string().max(50),
  email: Joi.string()
    .email()
    .regex(getEmailDomainRegex(emailDomains))
    .message(
      `Email must be from an approved educational institution. Allowed domains are: ${formatDomainList(
        emailDomains
      )}`
    ),
  password: Joi.string().min(0).default(''),
  description: Joi.string().min(0).max(200).default(''),
  deletedAt: Joi.alternatives().try(Joi.date(), Joi.allow(null)),
  roles: Joi.array()
    .items(Joi.string().valid('superuser', 'teacher', 'student'))
    .unique(),
  avatar: Joi.array()
    .items(
      Joi.string().valid('beam', 'marble', 'pixel', 'sunset', 'ring', 'bauhaus')
    )
    .unique(),
  active: Joi.boolean(),
  approved: Joi.boolean(),
  expiresAt: Joi.date(),
  lastUserAccess: Joi.date(),
  images: Joi.any(),
  status: Joi.any(),
  languages_to_learn: Joi.array()
    .items(
      Joi.object({
        language: Joi.string().required(),
        credits: Joi.number().required().min(1).max(5),
        level: Joi.string().valid('a1', 'a2', 'b1', 'b2', 'c1', 'c2').required()
      })
    )
    .unique(),
  languages_for_teach: Joi.array()
    .items(
      Joi.object({
        language: Joi.string().required(),
        credits: Joi.number().required().min(1).max(5),
        level: Joi.string().valid('a1', 'a2', 'b1', 'b2', 'c1', 'c2').required()
      })
    )
    .unique()
}).custom((value, helper) => {
  const { languages_to_learn, languages_for_teach } = value;
  if (languages_for_teach?.length > 0 && languages_to_learn?.length > 0) {
    const learnLanguages = languages_to_learn.map((lang) => lang.language);
    const teachLanguages = languages_for_teach.map((lang) => lang.language);
    const duplicates = learnLanguages.some((lang) =>
      teachLanguages.includes(lang)
    );
    if (duplicates) {
      return helper.message(
        "A language cannot be in both 'languages_to_learn' and 'languages_for_teach'"
      );
    }
    return value;
  }
  return value;
});

const loginValidationSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .regex(getEmailDomainRegex(emailDomains))
    .message(
      `Email must be from an approved educational institution. Allowed domains are: ${formatDomainList(
        emailDomains
      )}`
    ),
  password: Joi.string().required()
});

const newsValidationSchema = Joi.object({
  title: Joi.string().required().min(5).max(100),
  content: Joi.string().required().min(5).max(2000),
  author: Joi.string().required()
});

const newsPatchSchema = Joi.object({
  title: Joi.string().min(5).max(100),
  content: Joi.string().min(5).max(2000),
  author: Joi.string().required()
});

const chatSchema = Joi.object({
  matchId: Joi.string().required(),
  sender: Joi.string().required(),
  receiver: Joi.string().required(),
  message: Joi.string().required().max(200),
  seen: Joi.array().items(Joi.string())
});

module.exports = {
  userValidationSchema,
  loginValidationSchema,
  newsValidationSchema,
  newsPatchSchema,
  userPatchSchema,
  chatSchema
};
