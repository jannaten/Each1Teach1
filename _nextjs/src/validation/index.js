const Joi = require("joi");

function getEmailDomainRegex(allowedDomains) {
  const domainRegex = allowedDomains
    .map((domain) => domain.replace(".", "\\."))
    .join("|");
  return new RegExp(`@(${domainRegex})$`);
}

const allowedEmailDomains = ["tuni.fi"];

export const userValidationSchema = Joi.object({
  firstName: Joi.string().required().max(50),
  lastName: Joi.string().required().max(50),
  email: Joi.string()
    .required()
    .email()
    .regex(getEmailDomainRegex(allowedEmailDomains)),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)
    .message(
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be 8-20 characters long."
    ),
  description: Joi.string().max(200),
  role: Joi.string().valid("admin", "teacher", "student"),
  isActive: Joi.boolean(),
  lastUserAccess: Joi.date(),
  profilePicturePath: Joi.string(),
  languages_to_learn: Joi.array()
    .items(
      Joi.object({
        language: Joi.string().required(),
        credits: Joi.number().required().min(1).max(5),
        level: Joi.string()
          .valid("a1", "a2", "b1", "b2", "c1", "c2")
          .required(),
      })
    )
    .unique(),
  languages_for_teach: Joi.array()
    .items(
      Joi.object({
        language: Joi.string().required(),
        credits: Joi.number().required().min(1).max(5),
        level: Joi.string()
          .valid("a1", "a2", "b1", "b2", "c1", "c2")
          .required(),
      })
    )
    .unique(),
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

export const tokenValidationSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .regex(getEmailDomainRegex(allowedEmailDomains)),
  password: Joi.string().required(),
});

export const newsValidationSchema = Joi.object({
  title: Joi.string().required().min(5).max(100),
  content: Joi.string().required().min(5).max(500),
  author: Joi.string().required(),
});
