"use strict";

const pool = require('../database/pool');

const TABLE_NAME = 'address';

const mapForDB = (data) => {
	return {
		'street': data.streetAddress,
		'supplement': data.streetAddressSupplement,
		'postcode': data.postcode,
		'city': data.city,
		'country_code': data.countryCode
	}
};

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		const sql = `SELECT
			\`id\`,  \`street\`, \`supplement\`, \`city\`, 
			\`postcode\`, \`country_code\` AS \`countryCode\`
			FROM \`${TABLE_NAME}\` WHERE \`id\` = ?`;
		pool.query(sql, id, (error, rows) => {
			if (error) {
				reject(error);
				throw error;
			}
			console.log(rows)
			rows.length < 1 ? reject("Not found") : resolve(rows[0]);
		});
	});
};

exports.addAddress = (values) => {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO \`${TABLE_NAME}\` SET ?`;

		pool.query(sql, mapForDB(values), (error, result) => {
			if (error) {
				reject(error);
				throw error;
			}
			resolve(result.insertId)
		});
	});
};