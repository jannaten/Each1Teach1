const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
var expressStaticGzip = require('express-static-gzip');
const { logger, errorLogger, requestLogger } = require('./utilities/logger');

const { visitorLogger } = require('./middlewares/analyticsHandler');
const { errorHandler } = require('./middlewares/errorHandler');
const {
  unknownEndpointHandler
} = require('./middlewares/unknownEndpointHandler');

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
app.listen(port, () => {
  logger.info(`[app] Server running on port ${port}`);
});
