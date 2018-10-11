const pool = require('../database/pool');

const PASS_TABLE_NAME = 'pass';
const USER_TABLE_NAME = 'user';
const QR_TABLE_NAME = "qr_code"

exports.getByUserId = (userId) => new Promise((resolve, reject) => {
	const sql = `
		SELECT \`id\`, \`first_name\` AS \`firstName\`, \`last_name\` AS \`lastName\` 
		FROM ${USER_TABLE_NAME} WHERE \`id\` IN
		(SELECT DISTINCT \`traveler_id\` AS \`travelerId\` FROM \`${PASS_TABLE_NAME}\` WHERE \`user_id\`=?)`;
	pool.query(sql, userId,
		(error, rows) => {
			if (error) {
				console.error(error);
				reject(error);
				return null;
			}
			resolve(rows.length > 0 ? rows : []);
		}
	)
});

exports.getByQr = (qr) => new Promise((resolve, reject) => {
	const sql = `SELECT ${USER_TABLE_NAME}.\`id\`, \`first_name\` AS \`firstName\`, \`last_name\` AS \`lastName\`
		FROM \`${USER_TABLE_NAME}\` 
		INNER JOIN ${QR_TABLE_NAME}
		ON ${USER_TABLE_NAME}.id=${QR_TABLE_NAME}.user_id AND ${QR_TABLE_NAME}.value=?`;
	pool.query(sql, qr,
		(error, rows) => {
			if (error) {
				console.error(error);
				reject(error);
				return null;
			}
			resolve(rows.length > 0 ? rows[0] : null);
		}
	)
});
