const pool = require('../database/pool');

const TABLE_NAME = 'entry';

exports.create = (entry) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO \`${TABLE_NAME}\` SET ?`;
	if (!entry) {
		reject("Entry is not defined or null");
		return -1;
	}
	pool.query(sql, entry, (error, result) => {
		if (error) {
			console.error(error);
			reject(error);
			return -1;
		}
		resolve(result.insertId);
	});
});