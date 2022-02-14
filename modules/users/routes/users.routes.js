const { signup, login } = require('../controllers/users.controller');
const { validateSignupData, validateLoginData } = require('../middlewares/users.middleware');

module.exports = (router) => {
    router.post('/signup', validateSignupData, signup);
    router.post('/login', validateLoginData, login);
};
