const httpStatus = require('http-status');
const catchAsync = require('../../../utils/catchAsync');
const { UserModel } = require('../../../models');
const AppError = require('../../../utils/AppError');
const { ROLES } = require('../../../config/constants');
const { generateToken } = require('../../../middlewares/authenticate');

const signup = catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const role = ROLES.STUDENT;
    const isUserAlreadyExists = await UserModel.count({ username });
    if (isUserAlreadyExists) {
        return res.status(httpStatus.NOT_ACCEPTABLE).send({ message: 'username already exists' });
    }
    const userData = new UserModel({
        username, password, role
    });
    const newUserData = await userData.save();
    const token = generateToken({ userId: newUserData._id, role });
    res.status(httpStatus.OK).send({ authToken: token, message: 'OK' });
});

const login = catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const userData = await UserModel.findOne({ username }, { password: 1, role: 1 });
    if (!userData) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'username does not exists' });
    }
    const isPasswordMatched = userData.comparePassword(password);
    if (!isPasswordMatched) {
        return res.status(httpStatus.UNAUTHORIZED).send({ message: 'invalid password' });
    }
    const token = generateToken({ userId: userData._id, role: userData.role });
    res.status(httpStatus.OK).send({ authToken: token, message: 'OK' });
});

module.exports = {
    signup,
    login,
}