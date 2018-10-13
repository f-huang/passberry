"use strict";

const pool = require('../database/pool');

const TABLE_NAME = "attraction";
const IMAGE_TABLE_NAME = "attraction_image";


exports.get = (filters) => new Promise((resolve, reject) => {
	const sql = `SELECT \`${TABLE_NAME}\`.\`id\`, \`name\`, \`link\`, \`description\`, \`type\`,
		\`price_adult\` AS \`priceAdult\`, \`price_child\` AS \`priceChild\`,
		\`price_max_age_for_child\` AS \`priceMaxAgeForChild\`,
		\`address_street\` AS \`addressStreet\`, \`address_supplement\` AS \`addressSupplement\`,
		\`address_city\` AS \`addressCity\`, \`address_postcode\` AS \`addressPostcode\`,
		\`address_country_code\` AS \`addressCountryCode\`,
		GROUP_CONCAT(\`${IMAGE_TABLE_NAME}\`.\`path\`) AS \`images\` 
		FROM \`${TABLE_NAME}\`
		LEFT JOIN ${IMAGE_TABLE_NAME} 
		ON \`${TABLE_NAME}\`.\`id\`=\`${IMAGE_TABLE_NAME}\`.\`attraction_id\`
		${filters ? "WHERE ?" : ""}
		GROUP BY \`${TABLE_NAME}\`.\`id\`
	`;
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