"use strict";

const pool = require('../database/pool');
const utils = require('../database/utils');


const TABLE_NAME = "user";
const EnumUserType = Object.freeze({
	Tourist: "TOURIST",
	Partner: "PARTNER",
	Staff: "STAFF",
	Municipality: "MUNICIPALITY"
});


const isTourist = (type) => type === EnumUserType.Tourist;
const isStaff = (type) => type === EnumUserType.Staff;
const isPartner = (type) => type === EnumUserType.Partner;
const isMunicipality = (type) => type === EnumUserType.Municipality;


const DEFAULT_USER_TYPE = EnumUserType.Tourist;


const mapForDB = (data) => {
	return {
		'mail': data.email,
		'first_name': data.firstName,
		'last_name': data.lastName,
		'password': data.password,
		'gender': data.gender,
		'type': DEFAULT_USER_TYPE,
		'address_id': 1
	}
};


exports.exists = (email) => {
	return new Promise((resolve, reject) => {
		const sql = `SELECT \`_id\` FROM \`${TABLE_NAME}\` WHERE \`mail\` = ?`;
		pool.query(sql, email,
			(error, rows) => {
				if (error) {
					reject(error);
					throw error;
				}
				resolve(rows.length === 1);
			}
		);
	});
};


exports.getUserTypes = () => EnumUserType;


exports.getUser = (email, password, columns) => {
	return new Promise((resolve, reject) => {
		const columnsAsString = utils.getColumnsAsString(columns, ['_id', 'password']);

		const sql = `SELECT ${columnsAsString} FROM \`${TABLE_NAME}\` WHERE \`mail\`=?`;

		pool.query(sql, email,
			(error, rows) => {
				if (error) {
					reject(error);
					throw error;
				}
				resolve(rows.length === 1 && password === rows[0].password ? rows[0] : undefined);
			}
		);
	});
};


exports.getUserById = (id, columns) => {
	return new Promise((resolve, reject) => {
		const columnsAsString = utils.getColumnsAsString(columns, ['mail']);
		const sql = `SELECT ${columnsAsString} FROM \`${TABLE_NAME}\` WHERE \`_id\`=?`;

		pool.query(sql, id,
			(error, rows) => {
				if (error) {
					reject(error);
					throw error;
				}
				resolve(rows.length === 1 ? rows[0] : undefined);
			}
		);
	});
};


exports.addUser = (user) => {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO \`${TABLE_NAME}\` SET ?`;

		pool.query(sql, mapForDB(user), (error, result) => {
			if (error) {
				reject(error);
				throw error;
			}
			resolve(result.insertId);
		});
	});
};


exports.updateUser = (user) => {
	return new Promise((resolve, reject) => {
		const entries = mapForDB(user);
		let sql = `UPDATE \`${TABLE_NAME}\` SET `;
		let values = [];

		for (let entry of entries) {
			if (entry.value) {
				sql += `\`${entry.tabIndex}\` = ?, `;
				values.push(entry.value);
			}
		}
		sql.slice(0, -2).concat(` WHERE \`_id\`= ?`);
		values.push(user.id);
		pool.query(sql, values, (error, rows) => {
			if (error) {
				reject(error);
				throw error;
			}
			resolve(rows);
		});
	});
};