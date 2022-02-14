const httpStatus = require('http-status');
const catchAsync = require('../../../utils/catchAsync');
const { PostModel } = require('../../../models');
const Pagination = require('../../../utils/Pagination');

const addPost = catchAsync(async (req, res) => {
    const { content } = req.body;
    const postData = new PostModel({ content, createdBy: req.userId });
    await postData.save();
    res.status(httpStatus.OK).send({ postId: postData._id, message: 'OK' });
});

const getPosts = catchAsync(async (req, res) => {
    const { pageNumber, pageSize } = req.query;
    const pagination = new Pagination({ pageNumber, pageSize });
    const limit = pagination.getLimit();
    const skip = pagination.getOffset();
    const findQuery = { isDeleted: { $ne: true } };
    const [posts, totalPosts] = await Promise.all([
        PostModel.find(findQuery, { content: 1 }).sort({ _id: -1 }).skip(skip).limit(limit).lean(),
        PostModel.count(findQuery)
    ]);
    const totalNoOfPages = pagination.getNoOfPages(totalPosts);
    const responseData = {
        posts,
        totalNoOfPages,
        totalPosts,
        pageNumber,
        pageSize,
    };
    res.status(httpStatus.OK).send(responseData);
});

const updatePost = catchAsync(async (req, res) => {
    const { content, postId } = req.body;
    const isValidPostId = await PostModel.count({ _id: postId, isDeleted: { $ne: true } });
    if (!isValidPostId) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: 'invalid postId' });
    }
    await PostModel.findOneAndUpdate({ _id: postId }, { $set: { content } });
    res.status(httpStatus.OK).send({ message: 'OK' });
});

const deletePost = catchAsync(async (req, res) => {
    const { postId } = req.query;
    const isValidPostId = await PostModel.count({ _id: postId, isDeleted: { $ne: true } });
    if (!isValidPostId) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: 'invalid postId' });
    }
    await PostModel.findOneAndUpdate({ _id: postId }, { $set: { isDeleted: true } });
    res.status(httpStatus.OK).send({ message: 'OK' });
});

module.exports = {
    addPost,
    getPosts,
    deletePost,
    updatePost,
}