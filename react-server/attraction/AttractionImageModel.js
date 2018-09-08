"use strict";

const pool = require('../database/pool');

const TABLE_NAME = "attraction_image";


const mapForDb = (data) => {
	return {
		'path': data.path,
		'description_id' : data.descriptionId
	}
};


exports.getById = (id) => {
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


exports.create = (id, files) => {
	const sql = `INSERT INTO \`${TABLE_NAME}\` SET ?; `;
	const images = [];
	for (let file of files) {
		images.push(mapForDb({
			path: file.path,
			descriptionId: id
		}));
	}
	return new Promise((resolve, reject) => {
		pool.query(sql.repeat(images.length), images, (error, result) => {
			if (error) {
				reject(error);
				throw(error);
			}
			resolve(result.insertId);
		})
	});
};


exports.delete = (id) => {
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