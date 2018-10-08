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
	const sql = `UPDATE ${TABLE_NAME} SET ? WHERE id=${pass.id}`;
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
		WHERE id = ? 
	`;
	pool.query(sql, [pass.initTime, pass.expirationTime, pass.id], (error, result) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(result);
	});
});

exports.getById = (id) => new Promise((resolve, reject) => {
	const sql = `SELECT
		\`id\`, \`user_id\` AS \`userId\`, \`traveler_id\` AS \`travelerId\`
		FROM ${TABLE_NAME} WHERE id=?`;
	pool.query(sql, id, (error, row) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(row.insertId);
	});
});

exports.getByUserId = (userId) => new Promise((resolve, reject) => {
	const sql = `SELECT 
	\`id\`, \`user_id\` AS \`userId\`, \`traveler_id\` AS \`travelerId\`,
	\`init_time\` AS \`initTime\`, \`expiration_time\` AS \`expirationTime\` 
	FROM ${TABLE_NAME} WHERE \`user_id\`=?`;
	pool.query(sql, userId, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(rows ? rows[0] : {});
	});
});

exports.getByTravelerId = (userId) => new Promise((resolve, reject) => {
	const sql = `SELECT 
	\`id\`, \`user_id\` AS \`userId\`, \`traveler_id\` AS \`travelerId\`,
	\`init_time\` AS \`initTime\`, \`expiration_time\` AS \`expirationTime\` 
	FROM ${TABLE_NAME} WHERE \`traveler_id\`=?`;
	pool.query(sql, userId, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(rows ? rows[0] : {});
	});
});

