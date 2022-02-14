const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');


const authenticate = catchAsync((req, res, next) => {
    if (!req.headers.authorization) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorised Access !!')
    }
    const authToken = req.headers.authorization.split(' ')[1];
    const authDecode = jwt.verify(authToken, config.JWT_SECRET);

    /*
    redis can be used here for storing and verifying incoming auth token
    */

    req._id = authDecode._id;
    req.userId = authDecode._id;
    next();
});

const generateToken = (userId, role) => {
    const payload = {
        userId,
        role,
    };
    return jwt.sign(payload, config.JWT_SECRET);
}

module.exports = {
    authenticate,
    generateToken,
}