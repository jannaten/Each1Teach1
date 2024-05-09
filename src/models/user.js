import { models, model, Schema } from "mongoose";

function validateEmailDomain(email) {
  const allowedDomains = ["tuni.fi", "example.com"];
  const domain = email.split("@")[1];
  return allowedDomains.includes(domain);
}

const languageSchema = new Schema({
  language: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  level: {
    type: String,
    enum: ["a1", "a2", "b1", "b2", "c1", "c2"],
    required: true,
  },
});

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validateEmailDomain,
        message: (props) =>
          `${props.value} is not a valid email. Only specific domain emails are allowed.`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 200,
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    lastUserAccess: {
      type: Date,
      default: Date.now,
    },
    profilePicturePath: {
      type: String,
    },
    languages_to_learn: [languageSchema],
    languages_for_teach: [languageSchema],
  },
  {
    timestamps: true,
  }
);

const UserModel = models?.User || model("User", userSchema);

export default UserModel;
