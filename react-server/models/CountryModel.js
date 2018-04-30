"use strict";

const pool = require('../database/pool');

exports.getCountryByName = (name) => {
	return new Promise((resolve, reject) => {
		const sql = `SELECT \`code\` FROM \`country\` WHERE \`name\` = ?`;
		pool.query(sql, name, (error, rows) => {
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
		const sql = `SELECT \`name\` FROM \`country\` WHERE \`code\` = ?`;
		pool.query(sql, code, (error, rows) => {
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
		const sql = `SELECT * from \`country\``;
		pool.query(sql, code, (error, rows) => {
			if (error) {
				reject(error);
				throw error;
			}
			resolve(rows);
		})
	});
};