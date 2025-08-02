// backend/config/index.js
const path = require("path");

// Load appropriate .env file based on NODE_ENV
if (process.env.NODE_ENV === "test") {
  const testEnvPath = path.resolve(__dirname, "..", "..", ".env.test");
  require("dotenv").config({ path: testEnvPath });
} else {
  require("dotenv").config();
}

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
