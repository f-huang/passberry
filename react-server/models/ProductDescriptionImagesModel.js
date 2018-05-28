"use strict";

const pool = require('../database/pool');

const TABLE_NAME = "product_description_image";

const mapForDb = (data) => {
	return {
		'path': data.path,
		'description_id' : data.descriptionId
	}
};


exports.getImageById = (id) => {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * from \`${TABLE_NAME}\` WHERE \`_id\`= ?`;
		pool.query(sql, id, (error, rows) => {
			if (error) {
				reject(error);
				throw error;
			}
			resolve(rows);
		})
	});
};


exports.addImage = (descriptionId) => {
	const image = {
		path: "/",
		descriptionId: descriptionId
	};
	const sql = `INSERT INTO \`${TABLE_NAME}\` SET ?`;
	return new Promise((resolve, reject) => {
		pool.query(sql, mapForDb(image), (error, result) => {
			if (error) {
				reject(error);
				throw(error);
			}
			resolve(result.insertId);
		})
	});
};


exports.deleteImage = (id) => {
	return new Promise((resolve, reject) => {
		let sql = `DELETE FROM \`${TABLE_NAME}\` WHERE \`_id\`= ?`;
		pool.query(sql, id, (error, rows) => {
			if (error) {
				reject(error);
				throw error;
			}
			resolve(rows);
		});
	});
};