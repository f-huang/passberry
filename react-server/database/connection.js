"use strict";

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    multipleStatements: true,
    database: 'dev_passberry'
});

module.exports = connection;