"use strict";

const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    multipleStatements: true,
    database: 'dev_passberry'
});

module.exports = pool;