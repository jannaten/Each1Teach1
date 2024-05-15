import { models, model, Schema } from "mongoose";

const chatSchema = new Schema(
  {
    chatChannelId: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = models.Chat || model("Chat", chatSchema);

export default ChatModel;
