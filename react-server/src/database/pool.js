"use strict";
const config = require('./config');
const mysql = require('mysql');
const pool = mysql.createPool({
    host: config.HOST,
	port: config.PORT,
    user: config.USER,
    password: config.PASSWORD,
    multipleStatements: true,
    database: config.DATABASE
});

module.exports = pool;