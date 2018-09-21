const pool = require('../database/pool');

const TABLE_NAME = 'pass';

exports.create = (pass) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO ${TABLE_NAME} SET ?`;
	pool.query(sql, pass, (error, row) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(row.insertId);
	});
});

exports.update = (pass) => new Promise((resolve, reject) => {
	const sql = `UPDATE ${TABLE_NAME} SET ? WHERE _id=${pass._id}`;
	pool.query(sql, pass, (error, row) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(row.insertId);
	});
});

exports.init = (pass) => new Promise((resolve, reject) => {
	const sql = `
		UPDATE ${TABLE_NAME}
		SET
		\`init_time\` = CASE WHEN \`init_time\` IS NULL THEN ? ELSE \`init_time\`, 
		\`expiration_time\` = CASE WHEN \`expiration_time\` IS NULL THEN ? ELSE \`expiration_time\`
		WHERE _id = ? 
	`;
	pool.query(sql, [pass.init_time, pass.expiration_time, pass._id], (error, result) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(result);
	});
});