"use strict";

const pool = require('../database/pool');
const TABLE_NAME = "country";

exports.getCountryByName = (name) => {
	return new Promise((resolve, reject) => {
		if (name === undefined || name === null || name.trim() === "")
			reject("Invalid name");
		const sql = `SELECT \`code\` FROM \`${TABLE_NAME}\` WHERE \`name\` = ?`;
		pool.query(sql, name[0].toUpperCase() + name.slice(1).toLowerCase(), (error, rows) => {
			if (error) {
				reject(error);
				throw error;
			}
			rows.length < 1 ? reject("Not found") : resolve(rows[0].code);
		});
	});
};

exports.getCountryByCode = (code) => {
	return new Promise((resolve, reject) => {
		if (code === undefined || code === null || code.trim() === "")
			reject("Invalid code");
		const sql = `SELECT \`name\` FROM \`${TABLE_NAME}\` WHERE \`code\` = ?`;
		pool.query(sql, code.toUpperCase(), (error, rows) => {
			if (error) {
				reject(error);
				throw error;
			}
			rows.length < 1 ? reject("Not found") : resolve(rows[0].name);
		});
	});
};

exports.getAllCountries = () => {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * from \`${TABLE_NAME}\``;
		pool.query(sql, undefined, (error, rows) => {
			if (error) {
				reject(error);
				throw error;
			}
			resolve(rows);
		})
	});
};