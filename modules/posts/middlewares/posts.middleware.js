const httpStatus = require('http-status');
const catchAsync = require('../../../utils/catchAsync');
const AppError = require('../../../utils/AppError');
const { MAX_POST_LENGTH } = require('../../../config/constants');

const validateAddPostData = catchAsync((req, res, next) => {
    const { content } = req.body;
    if (!content || !content.trim() || content.length > MAX_POST_LENGTH) {
        throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, `content of length <=${MAX_POST_LENGTH} required`, 'content required in body');
    }
    next();
});

const validateGetPostsData = catchAsync((req, res, next) => {
    const { pageNumber, pageSize } = req.query;
    if (!pageNumber || !pageNumber.trim() ) {
        throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, `pageNumber required`, 'pageNumber required in query');
    }
    if (!pageSize || !pageSize.trim() ) {
        throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, `pageSize required`, 'pageSize required in query');
    }
    next();
});

module.exports = {
    validateAddPostData,
    validateGetPostsData,
}