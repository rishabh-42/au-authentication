const express = require('express');

const router = express.Router();

require('../modules/users/routes/users.routes')(router);

require('../modules/posts/routes/posts.routes')(router);

module.exports = router;
