const pool = require('../database/pool');

const TABLE_NAME = 'scan';

exports.create = (scan) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO \`${TABLE_NAME}\` SET ?`;
	if (!scan) {
		reject("Scan is not defined or null");
		return -1;
	}
	pool.query(sql, scan, (error, result) => {
		if (error) {
			console.error(error);
			reject(error);
			return -1;
		}
		resolve(result.insertId);
	});
});


exports.update = (scan) => new Promise((resolve, reject) => {
	const sql = `UPDATE \`${TABLE_NAME}\` SET ? WHERE \`id\`=${scan.id}`;
	if (!scan) {
		reject("Scan is not defined or null");
		return -1;
	}
	pool.query(sql, scan, (error, ret) => {
		if (error) {
			console.error(error);
			reject(error);
			return -1;
		}
		resolve(ret.affectedRows);
	});
});

exports.getById = (scanId) => new Promise((resolve, reject) => {
	const sql = `SELECT
		\`id\`, \`timestamp\`,
		\`staff_user_id\` AS \`userId\`, \`attraction_id\` AS \`attractionId\`,
		\`qr_code\` AS \`qr\`, \`state\` 
		FROM ${TABLE_NAME}
		WHERE \`id\`=?
	`;
	if (!scanId) {
		reject("ScanId is not defined or null");
		return -1;
	}
	pool.query(sql, scanId, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return -1;
		}
		resolve(rows && rows.length > 0 ? rows[0] : null);
	});
});