const express = require('express');

const httpStatus = require('http-status');
const logger = require('./config/logger');
const config = require('./config/config');


const { errorConverter, errorHandler } = require('./middlewares/error');
const AppError = require('./utils/AppError');
const routes = require('./routers/index');
const morgan = require('./config/morgan');

const { init: dbInit } = require('./config/db');
dbInit();

const app = express();

// parse json request body
app.use(express.json());

if (config.env !== 'prod') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

app.use(routes);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new AppError(httpStatus.NOT_FOUND, 'Route Not found'));
});

// convert error to AppError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

const server = app.listen(config.PORT, () => {
    logger.info(`Starting server on port ${config.PORT}`);
    logger.info(`Server Started.. Listening to port ${config.PORT}`);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = error => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});

module.exports = app;