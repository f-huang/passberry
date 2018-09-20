const pool = require('../database/pool');

const TABLE_NAME = 'transaction';

exports.create = (payment) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO ${TABLE_NAME} SET ?`;
	pool.query(sql, payment, (error, result) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(result.insertId);
	});
});