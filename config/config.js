require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "ags",
    password: process.env.DB_PASSWORD || "ags@123",
    database: process.env.DB_NAME || "todo_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "test_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
};