const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
const http = require('http'); // Import the http module
const socketIo = require('socket.io'); // Import socket.io

var expressStaticGzip = require('express-static-gzip');
const { logger, errorLogger, requestLogger } = require('./utilities/logger');

const { visitorLogger } = require('./middlewares/analyticsHandler');
const { errorHandler } = require('./middlewares/errorHandler');
const {
	unknownEndpointHandler
} = require('./middlewares/unknownEndpointHandler');
//
// const { addUser, removeUser, findConnectedUser } = require("./utilities/roomsActions");
const setupChatWebSocket = require('./chat'); // Import the chat WebSocket setup

// const {
// 	loadMessages,
// 	sendMsg,
// 	setMsgToUnread,
// 	deleteMsg
// } = require("./utilities/messageAction");
//
const apiRouter = require('./routes');
// const viewsRouter = require('./routes/views');

app.use(cors());
app.use(requestLogger);
app.use(visitorLogger);
app.use(expressStaticGzip('build'));
app.use(express.json({ limit: process.env.SERVER_ENTITY_PAYLOAD || '50mb' }));
app.use(fileUpload());



// socker.io starts from here
// const server = http.createServer(app); // Ensure the server is defined here

// const io = socketIo(server);

// io.on("connection", socket => {
// 	socket.on("join", async ({ userId }) => {
// 		const users = await addUser(userId, socket.id);
// 		console.log(users);

// 		setInterval(() => {
// 			socket.emit("connectedUsers", {
// 				users: users.filter(user => user.userId !== userId)
// 			});
// 		}, 10000);
// 	});

// 	socket.on("loadMessages", async ({ userId, messagesWith }) => {
// 		const { chat, error } = await loadMessages(userId, messagesWith);

// 		!error ? socket.emit("messagesLoaded", { chat }) : socket.emit("noChatFound");
// 	});

// 	socket.on("sendNewMsg", async ({ userId, msgSendToUserId, msg }) => {
// 		const { newMsg, error } = await sendMsg(userId, msgSendToUserId, msg);
// 		const receiverSocket = findConnectedUser(msgSendToUserId);

// 		if (receiverSocket) {
// 			// WHEN YOU WANT TO SEND MESSAGE TO A PARTICULAR SOCKET
// 			io.to(receiverSocket.socketId).emit("newMsgReceived", { newMsg });
// 		}
// 		//
// 		else {
// 			await setMsgToUnread(msgSendToUserId);
// 		}

// 		!error && socket.emit("msgSent", { newMsg });
// 	});

// 	socket.on("deleteMsg", async ({ userId, messagesWith, messageId }) => {
// 		const { success } = await deleteMsg(userId, messagesWith, messageId);

// 		if (success) socket.emit("msgDeleted");
// 	});

// 	socket.on("sendMsgFromNotification", async ({ userId, msgSendToUserId, msg }) => {
// 		const { newMsg, error } = await sendMsg(userId, msgSendToUserId, msg);
// 		const receiverSocket = findConnectedUser(msgSendToUserId);

// 		if (receiverSocket) {
// 			// WHEN YOU WANT TO SEND MESSAGE TO A PARTICULAR SOCKET
// 			io.to(receiverSocket.socketId).emit("newMsgReceived", { newMsg });
// 		}
// 		//
// 		else {
// 			await setMsgToUnread(msgSendToUserId);
// 		}

// 		!error && socket.emit("msgSentFromNotification");
// 	});

// 	socket.on("disconnect", () => removeUser(socket.id));
// });



const server = http.createServer(app); // Create the HTTP server

setupChatWebSocket(server); // Initialize the chat WebSocket
// 


app.use('/api', apiRouter);
// app.use(viewsRouter);

app.use(errorLogger);
app.use(errorHandler);
app.use(unknownEndpointHandler);

const port = process.env.SERVER_CONTAINER_PORT || 3001;
app.listen(port, () => {
	logger.info(`[app] Server running on port ${port}`);
});
