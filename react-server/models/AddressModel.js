"use strict";

const pool = require('../database/pool');
const utils = require('../database/utils');

const mapForDB = (data) => {
	return {
		'street': data.streetAddress,
		'supplement': data.streetAddressSupplement,
		'postcode': data.postcode,
		'city': data.city,
		'country_code': data.countryCode
	}
};

const DBColumns = [
	'street', 'supplement', 'postcode', 'city', 'country_code'
];
const aliases = [
	'street', 'supplement', 'postcode', 'city', 'countryCode'
];

exports.getAddressById = (id) => {
	return new Promise((resolve, reject) => {
		const columns = utils.getColumnsAliasesAsString(DBColumns, aliases);
		const sql = `SELECT ${columns} FROM \`address\` WHERE \`_id\` = ?`;

		pool.query(sql, id, (error, rows) => {
			if (error) {
				reject(error);
				throw error;
			}
			rows.length < 1 ? reject("Not found") : resolve(rows[0]);
		});
	});
};

exports.addAddress = (values) => {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO \`address\` SET ?`;

		pool.query(sql, mapForDB(values), (error, result) => {
			if (error) {
				reject(error);
				throw error;
			}
			resolve(result.insertId)
		});
	});
};