import { models, model, Schema } from "mongoose";

function validateDifferentUsers(requestUserId, recipientUserId) {
  return requestUserId.toString() !== recipientUserId.toString();
}

const matchSchema = new Schema(
  {
    requestUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: function (value) {
          return validateDifferentUsers(value, this.recipientUser);
        },
        message: "Request user and recipient user cannot be the same.",
      },
    },
    recipientUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    matchStartDate: {
      type: Date,
      default: Date.now,
    },
    matchEndDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);

const MatchModel = models.Match || model("Match", matchSchema);

export default MatchModel;
