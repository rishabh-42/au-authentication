const { addPost, getPosts, deletePost, updatePost } = require('../controllers/posts.controller');
const { validateAddPostData, validateGetPostsData, validateDeletePostData, validateUpdatePostData } = require('../middlewares/posts.middleware');
const { hasAdminRole } = require('../../../middlewares/authenticate');

module.exports = (router) => {
    router.post('/auth/posts', hasAdminRole, validateAddPostData, addPost);
    router.get('/auth/posts', validateGetPostsData, getPosts);
    router.delete('/auth/posts', hasAdminRole, validateDeletePostData, deletePost);
    router.put('/auth/posts', hasAdminRole, validateUpdatePostData, updatePost);

};
