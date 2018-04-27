"use strict";

const query = require('../database/query');

const mapToObject = (row) => {
	return ({
		'street': row.street,
		'supplement': row.supplement,
		'city': row.city,
		'postCode': row.zip_code,
		'countryCode' : row.country_code,
	});
};

exports.getAddressById = (id, callback) => {
	const sql = `
		SELECT 
			\`street\`,
			\`supplement\`,
			\`city\`,
			\`zip_code\`,
			\`country_code\`
		FROM \`address\` WHERE \`_id\` = ?`;
	query(sql, id, (rows) => {
		const result = (rows.length < 1 ? {} : mapToObject(rows[0]));
		callback(result);
	});
};

exports.addAddress = (columns, values, callback) => {
	const sql = `
		INSERT INTO \`address\`(${columns}) VALUES()
	`;
};