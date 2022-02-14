const { addPost, getPosts } = require('../controllers/posts.controller');
const { validateAddPostData, validateGetPostsData } = require('../middlewares/posts.middleware');
const { hasAdminRole } = require('../../../middlewares/authenticate');

module.exports = (router) => {
    router.post('/auth/posts', hasAdminRole, validateAddPostData, addPost);
    router.get('/auth/posts', validateGetPostsData, getPosts);
};
