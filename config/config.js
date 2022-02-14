const dotenv = require('dotenv');
const path = require('path');
const mode = process.env.NODE_ENV || 'dev';

dotenv.config({ path: path.join(__dirname, `../.env.${mode}`) });

const config = {
  NODE_ENV: mode,
  PORT: process.env.port || 3001,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
};

module.exports = config;