"use strict";

const pool = require('../database/pool');

const TABLE_NAME = "attraction";


exports.get = (filters) => new Promise((resolve, reject) => {
	const sql = `SELECT \`id\`, \`name\`, \`link\`, \`description\`, \`type\`,
		\`price_adult\` AS \`priceAdult\`, \`price_child\` AS \`priceChild\`,
		\`price_max_age_for_child\` AS \`priceMaxAgeForChild\`   
		FROM \`${TABLE_NAME}\` ${filters ? "WHERE ?" : ""}`;
	console.log(sql, filters);
	pool.query(sql, filters, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(rows);
	})
});


exports.getAll = () => new Promise((resolve, reject) => {
	const sql = `SELECT
		\`id\`, \`name\`, \`link\`, \`description\`, \`type\`,
		\`price_adult\` AS \`priceAdult\`, \`price_child\` AS \`priceChild\`,
		\`price_max_age_for_child\` AS \`priceMaxAgeForChild\`   
		FROM \`${TABLE_NAME}\``;
	pool.query(sql, undefined, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(rows);
	})
});


exports.create = (attraction) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO \`${TABLE_NAME}\` SET ?`;
	if (!attraction) {
		reject("attraction is not defined or null");
		return -1;
	}
	pool.query(sql, attraction, (error, result) => {
		if (error) {
			console.error(error);
			reject(error);
			return -1;
		}
		resolve(result.insertId);
	})
});


exports.update = (attraction) => new Promise((resolve, reject) => {
	let sql = `UPDATE \`${TABLE_NAME}\` SET ? WHERE \`id\`=${attraction.id}`;
	pool.query(sql, attraction, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(rows);
	});
});