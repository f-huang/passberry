const pool = require('../database/pool');

const TABLE_NAME = 'pass_to_attraction';

exports.create = (passToAttraction) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO ${TABLE_NAME} SET ?`;
	pool.query(sql, passToAttraction, (error, row) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(row.insertId);
	});
});

exports.update = (passToAttraction) => new Promise((resolve, reject) => {
	const sql = `UPDATE FROM ${TABLE_NAME} SET ?`;
	pool.query(sql, passToAttraction, (error, row) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(row.insertId);
	});
});