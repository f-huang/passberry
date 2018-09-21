"use strict";

const pool = require('../database/pool');

const TABLE_NAME = 'basket';

exports.create = (basket) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO ${TABLE_NAME} SET ?`;
	pool.query(sql, basket, (error, row) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(row.insertId);
	});
});

exports.update = (basket) => new Promise((resolve, reject) => {
	const sql = `UPDATE FROM ${TABLE_NAME} WHERE _id=${basket._id}`;
	pool.query(sql, basket, (error, row) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(row.insertId);
	})
});


exports.validate = (state, userId, basketId) => new Promise((resolve, reject) => {
	const sql = `UPDATE ${TABLE_NAME} SET ? WHERE _id=${basketId}`;
	const params = {
		'user_id': userId,
		'state': state
	};
	pool.query(sql, params, (error, ret) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(ret.affectedRows);
	})
});
