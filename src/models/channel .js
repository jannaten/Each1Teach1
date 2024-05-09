import { models, model, Schema } from "mongoose";

const channelSchema = new Schema(
  {
    matchId: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ChannelModel = models.Channel || model("Channel", channelSchema);

export default ChannelModel;
