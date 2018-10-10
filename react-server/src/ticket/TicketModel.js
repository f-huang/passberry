const pool = require('../database/pool');

const TABLE_NAME = 'ticket';

exports.create = (ticket) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO ${TABLE_NAME} SET ?`;
	pool.query(sql, ticket, (error, row) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(row.insertId);
	});
});

exports.update = (ticket) => new Promise((resolve, reject) => {
	const sql = `UPDATE ${TABLE_NAME} SET ?`;
	pool.query(sql, ticket, (error, row) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(row.insertId);
	});
});

exports.getPassTickets = (passId) =>  new Promise((resolve, reject) => {
	const sql = `SELECT \`id\`, \`attraction_id\` AS \`attractionId\`, \`pass_id\` AS \`passId\`,
		\`used_time\` AS \`usedTime\` FROM ${TABLE_NAME} WHERE \`pass_id\`=?`;
	pool.query(sql, passId, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(rows ? rows : []);
	});
});