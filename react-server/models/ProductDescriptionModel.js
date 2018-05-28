"use strict";

const pool = require('../database/pool');

const TABLE_NAME = "product_description";

const mapForDb = (data) => {
	return {
		'name': data.name,
		'description' : data.description,
		'price' : data.price,
		'type' : data.type,
		'address_id' : data.addressId,
		'partner_id' : data.partnerId
	}
};


exports.getProducts = (filters) => {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * from \`${TABLE_NAME}\` ${filters && filters.isNotEmpty() ? "SET ?" : ""}`;
		pool.query(sql, filters, (error, rows) => {
			if (error) {
				reject(error);
				throw error;
			}
			resolve(rows);
		})
	});
};


exports.addProductDescription = (description) => {
	const sql = `INSERT INTO \`${TABLE_NAME}\` SET ?`;
	return new Promise((resolve, reject) => {
		pool.query(sql, mapForDb(description), (error, result) => {
			if (error) {
				reject(error);
				throw(error);
			}
			resolve(result.insertId);
		})
	});
};


exports.updateProductDescription = (description) => {
	return new Promise((resolve, reject) => {
		let sql = `UPDATE \`${TABLE_NAME}\` SET ? WHERE \\\`_id\\\`=${description._id}`;
		pool.query(sql, description, (error, rows) => {
			if (error) {
				reject(error);
				throw error;
			}
			resolve(rows);
		});
	});
};