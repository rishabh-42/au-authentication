const httpStatus = require('http-status');
const catchAsync = require('../../../utils/catchAsync');
const AppError = require('../../../utils/AppError');
const { MIN_PASSWORD_LENGTH } = require('../../../config/constants');

const isValidUsername = (username) => {
    if (!username || !username.trim()) {
        throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, 'username name required', 'username name required in body');
    }
}

const isValidPassword = (password) => {
    if (!password || !password.trim() || password.length < MIN_PASSWORD_LENGTH) {
        throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, `password of length >=${MIN_PASSWORD_LENGTH} required`, 'password required in body');
    }
}

const validateSignupData = catchAsync((req, res, next) => {
    const { username, password } = req.body;
    const validUsernameRegex = /^[a-z]+$/;
    if (!validUsernameRegex.test(username)) {
        throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, `only lowercase allowed in username`, 'use lowecase characters');
    }
    isValidUsername(username);
    isValidPassword(password);
    next();
});

const validateLoginData = catchAsync((req, res, next) => {
    const { username, password } = req.body;
    isValidUsername(username);
    isValidPassword(password);
    next();
});

module.exports = {
    validateSignupData,
    validateLoginData,
}