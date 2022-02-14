const mongoose = require('mongoose');
const config = require('../config/config');

function init() {
    const connectionString = `mongodb://${encodeURIComponent(config.DB_HOST)}:${config.DB_PORT}/${encodeURIComponent(config.DB_NAME)}`;
    const options = {
        user: config.DB_USER || '',
        pass: config.DB_PASS || '',
        useNewUrlParser: true,
    };

    mongoose.connect(connectionString, options, () => {
        console.log(`Successfully connected to DB ${config.DB_NAME}`);
    });
}

module.exports = {
    init
}