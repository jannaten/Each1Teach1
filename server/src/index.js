const cors = require('cors');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const fileUpload = require('express-fileupload');
var expressStaticGzip = require('express-static-gzip');

const { errorHandler } = require('./middlewares/errorHandler');
const { visitorLogger } = require('./middlewares/analyticsHandler');
const { logger, errorLogger, requestLogger } = require('./utilities/logger');
const {
  unknownEndpointHandler
} = require('./middlewares/unknownEndpointHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const apiRouter = require('./routes');
// const viewsRouter = require('./routes/views');

app.use(cors());
app.use(requestLogger);
app.use(visitorLogger);
app.use(expressStaticGzip('build'));
app.use(express.json({ limit: process.env.SERVER_ENTITY_PAYLOAD || '50mb' }));
app.use(fileUpload());

app.use('/api', apiRouter);
// app.use(viewsRouter);

app.use(errorLogger);
app.use(errorHandler);
app.use(unknownEndpointHandler);

const port = process.env.SERVER_CONTAINER_PORT || 3001;
server.listen(port, () => {
  logger.info(`[app] Server running on port ${port}`);
});
