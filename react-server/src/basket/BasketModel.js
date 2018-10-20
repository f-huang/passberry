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

exports.getUserIdById = (basketId) => new Promise((resolve, reject) => {
	const sql = `SELECT user_id as 'userId' FROM ${TABLE_NAME} WHERE id=?`;
	pool.query(sql, basketId, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		if (!rows || !rows[0]) {
			resolve(-1);
			return ;
		}
		resolve(rows[0].userId);
	});
});

exports.update = (basket) => new Promise((resolve, reject) => {
	const sql = `UPDATE ${TABLE_NAME} SET ? WHERE id=${basket.id}`;
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
	const sql = `UPDATE ${TABLE_NAME} SET ? WHERE id=${basketId}`;
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
