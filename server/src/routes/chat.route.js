const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ChatModel = require("../models/Chat.model")(mongoose);
const UserModel = require("../models/User.model")(mongoose);
const { authHandler } = require("../middlewares/authHandler");

// GET ALL CHATS
router.get("/", authHandler('student', 'teacher', 'superuser'), async (req, res) => {
	try {
		const userId = req.user._id;
		const userChats = await ChatModel.find({ sender: userId }).populate("sender", "firstName lastName");
		return res.json(userChats);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server Error");
	}
});

// GET USER INFO
router.get("/user/:userToFindId", authHandler('student', 'teacher', 'superuser'), async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.userToFindId);
		if (!user) {
			return res.status(404).send("No User found");
		}
		return res.json({ name: `${user.firstName} ${user.lastName}`, avatar: user.avatar });
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server Error");
	}
});

// DELETE A CHAT
router.delete("/:chatId", authHandler('student', 'teacher', 'superuser'), async (req, res) => {
	try {
		const userId = req.user._id;
		const { chatId } = req.params;

		const chat = await ChatModel.findById(chatId);
		if (!chat) {
			return res.status(404).send("Chat not found");
		}
		if (chat.sender.toString() !== userId.toString()) {
			return res.status(403).send("Unauthorized");
		}

		await ChatModel.findByIdAndDelete(chatId);
		return res.status(200).send("Chat deleted");
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server Error");
	}
});

// POST: SEND A NEW MESSAGE
router.post("/", authHandler('student', 'teacher', 'superuser'), async (req, res) => {
	try {
		const { recipientId, message, attachment } = req.body;
		const senderId = req.user._id;

		// Validate recipientId and attachment as valid ObjectIds
		if (!mongoose.Types.ObjectId.isValid(recipientId)) {
			return res.status(400).send("Invalid recipientId");
		}
		if (attachment && !mongoose.Types.ObjectId.isValid(attachment)) {
			return res.status(400).send("Invalid attachment Id");
		}

		// Ensure the recipient exists
		const recipient = await UserModel.findById(recipientId);
		if (!recipient) {
			return res.status(404).send("Recipient not found");
		}

		// Create a new chat message
		const newMessage = new ChatModel({
			channelId: new mongoose.Types.ObjectId(), // or use an existing channelId if applicable
			sender: senderId,
			message,
			attachment: attachment ? mongoose.Types.ObjectId(attachment) : undefined
		});

		// Save the message to the database
		await newMessage.save();

		return res.status(201).json(newMessage);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server Error");
	}
});



module.exports = router;
