// This file sets up the PostgreSQL database connection using environment variables.

const path = require("path");
require('dotenv').config();

const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    ssl: { rejectUnauthorized: false }
});
module.exports = pool;