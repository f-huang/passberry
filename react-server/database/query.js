"use strict";

const pool = require('./pool');

const query = (query, values, callback) => {
	pool.query(query, values, (error, rows) => {
		console.log(query);
		if (error) throw error;
		callback(rows);
	});
};

module.exports = query;