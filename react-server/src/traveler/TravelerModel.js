const pool = require('../database/pool');

const PASS_TABLE_NAME = 'pass';
const USER_TABLE_NAME = 'user';

exports.getByUserId = (userId) => new Promise((resolve, reject) => {
	const sql = `
		SELECT \`id\`, \`first_name\` AS \`firstName\`, \`last_name\` AS \`lastName\`, ${userId} AS \`userId\` 
		FROM ${USER_TABLE_NAME} WHERE \`id\` IN
		(SELECT DISTINCT \`traveler_id\` AS \`travelerId\` FROM \`${PASS_TABLE_NAME}\` WHERE \`user_id\`=?)`;
	pool.query(sql, userId,
		(error, rows) => {
			if (error) {
				console.error(error);
				reject(error);
				return null;
			}
			console.log(rows);
			resolve(rows.length > 0 ? rows : null);
		}
	)
});
