"use strict";

const pool = require('../database/pool');

const TABLE_NAME = "qr_code";


const uniqueNumber = () => (Date.now() + (Math.round(Math.random()) * 100000000)).toString(16);


exports.getByUserId = (userId) => new Promise((resolve, reject) => {
	const sql = `SELECT * from \`${TABLE_NAME}\` WHERE user_id = ? ORDER BY \`timestamp\` DESC`;
	if (!userId) {
		reject("user id not defined or null");
		return null;
	}
	pool.query(sql, userId, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		if (!rows) {
			reject("No qr found");
			return null;
		}
		resolve(rows[0]);
	})
});


exports.getAll = () => new Promise((resolve, reject) => {
	const sql = `SELECT * from \`${TABLE_NAME}\``;
	pool.query(sql, undefined, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(rows);
	})
});


exports.generate = (userId) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO \`${TABLE_NAME}\` SET ?`;
	const values = {
		"user_id": userId,
		"value": uniqueNumber()
	};
	pool.query(sql, values, (error, result) => {
		if (error) {
			console.error(error);
			reject(error);
			return -1;
		}
		resolve(result.insertId);
	});
});


exports.create = (qr) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO \`${TABLE_NAME}\` SET ?`;
	if (!qr) {
		reject("qr is not defined or null");
		return -1;
	}
	pool.query(sql, qr, (error, result) => {
		if (error) {
			console.error(error);
			reject(error);
			return -1;
		}
		resolve(result.insertId);
	})
});

exports.findUser = (data) => new Promise((resolve, reject) => {
	const sql = `SELECT * FROM \`qr_code\`
	    INNER JOIN \`user\` ON 
	    \`qr_code\`.\`user_id\` = \`user\`.\`id\`
	    WHERE \`value\` = ?
	`;
	if (!data) {
		reject("touristData is not defined or null");
		return -1;
	}
	pool.query(sql, data, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		if (!rows || rows.length < 1) {
			reject("Could not read this qr code");
			return null
		}
		resolve(rows[0]);
	})
});
