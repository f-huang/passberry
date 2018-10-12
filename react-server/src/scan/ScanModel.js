const pool = require('../database/pool');

const TABLE_NAME = 'scan';

exports.create = (scan) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO \`${TABLE_NAME}\` SET ?`;
	if (!scan) {
		reject("Scan is not defined or null");
		return -1;
	}
	console.log(scan);
	pool.query(sql, scan, (error, result) => {
		if (error) {
			console.error(error);
			reject(error);
			return -1;
		}
		resolve(result.insertId);
	});
});
