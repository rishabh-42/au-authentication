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
    const [posts, totalPosts] = await Promise.all([
        PostModel.find({}, { content: 1 }).sort({ _id: -1 }).skip(skip).limit(limit).lean(),
        PostModel.count({})
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

module.exports = {
    addPost,
    getPosts,
}