"use strict";

const pool = require('../database/pool');

const TABLE_NAME = "attraction";
const IMAGE_TABLE_NAME = "attraction_image";

const COLUMNS = `\`${TABLE_NAME}\`.\`id\`, \`name\`, \`link\`, \`description\`, \`type\`,
		\`no_queuing\` as \`noQueuing\`,
		\`price_adult\` AS \`priceAdult\`, \`price_child\` AS \`priceChild\`,
		\`price_max_age_for_child\` AS \`priceMaxAgeForChild\`,
		\`address_street\` AS \`addressStreet\`, \`address_supplement\` AS \`addressSupplement\`,
		\`address_city\` AS \`addressCity\`, \`address_postcode\` AS \`addressPostcode\`,
		\`address_country_code\` AS \`addressCountryCode\`,
		\`opening_times_monday\` AS \`openingTimesMonday\`,
		\`opening_times_monday_2\` AS \`openingTimesMonday2\`,
		\`opening_times_tuesday\` AS \`openingTimesTuesday\`,
		\`opening_times_tuesday_2\` AS \`openingTimesTuesday2\`,
		\`opening_times_wednesday\` AS \`openingTimesWednesday\`,
		\`opening_times_wednesday_2\` AS \`openingTimesWednesday2\`,
		\`opening_times_thursday\` AS \`openingTimesThursday\`,
		\`opening_times_thursday_2\` AS \`openingTimesThursday2\`,
		\`opening_times_friday\` AS \`openingTimesFriday\`,
		\`opening_times_friday_2\` AS \`openingTimesFriday2\`,
		\`opening_times_saturday\` AS \`openingTimesSaturday\`,
		\`opening_times_saturday_2\` AS \`openingTimesSaturday2\`,
		\`opening_times_sunday\` AS \`openingTimesSunday\`,
		\`opening_times_sunday_2\` AS \`openingTimesSunday2\`
`;


exports.get = (filters) => new Promise((resolve, reject) => {
	const sql = `SELECT ${COLUMNS},
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


exports.getMustDos = (destination) => new Promise((resolve, reject) => {
	const sql = `SELECT ${COLUMNS},
		GROUP_CONCAT(\`${IMAGE_TABLE_NAME}\`.\`path\`) AS \`images\` 
		FROM \`${TABLE_NAME}\`
		LEFT JOIN ${IMAGE_TABLE_NAME} 
		ON \`${TABLE_NAME}\`.\`id\`=\`${IMAGE_TABLE_NAME}\`.\`attraction_id\`
		WHERE \`address_city\`=? AND \`is_a_must_do\`=1
		GROUP BY \`${TABLE_NAME}\`.\`id\`
	`;
	pool.query(sql, destination, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(rows);
	})
});


exports.getAll = (limit) => new Promise((resolve, reject) => {
	const sql = `SELECT
		${COLUMNS} 
		FROM \`${TABLE_NAME}\`
		${limit ? `LIMIT ${limit}` : ""}
	`;
	pool.query(sql, limit, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(rows);
	})
});

exports.getTravelDestinations = (limit) => new Promise((resolve, reject) => {
	const sql = `SELECT DISTINCT \`address_city\` as \`destination\` FROM ${TABLE_NAME}
		${limit ? `LIMIT ${limit}` : ""}
	`;
	pool.query(sql, limit, (error, rows) => {
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