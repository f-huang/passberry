"use strict";

const bcrypt = require('bcrypt');
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


exports.connect = (email, password) => new Promise((resolve, reject) => {
	this.get({ email: email })
		.then(rows => {
			if (!rows) {
				reject("No user found");
				return null;
			}
			const user = rows[0];
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					console.log("User found");
					resolve(user);
					return user;
				} else {
					reject("Wrong password");
					return null
				}
			})
		})
});


exports.exists = (email) => new Promise((resolve, reject) => {
	const sql = `SELECT \`_id\` FROM \`${TABLE_NAME}\` WHERE \`email\` = ?`;
	pool.query(sql, email,
		(error, rows) => {
			if (error) {
				console.error(error);
				reject(error);
				return false;
			}
			resolve(rows.length === 1);
		}
	);
});



exports.getTypes = () => EnumUserType;


exports.get = (filters, columns) => new Promise((resolve, reject) => {
	const sql = `SELECT * FROM \`${TABLE_NAME}\` WHERE ?`;
	pool.query(sql, filters,
		(error, rows) => {
			if (error) {
				console.error(error);
				reject(error);
				return null;
			}
			resolve(rows.length < 1 ? null : rows)
		}
	);
});


exports.getAll = () => new Promise((resolve, reject) => {
	const sql = `SELECT * FROM \`${TABLE_NAME}\``;
	pool.query(sql, undefined,
		(error, rows) => {
			if (error) {
				console.error(error);
				reject(error);
				return null;
			}
			resolve(rows.length === 1 ? rows : null);
		}
	);
});


exports.getById = (id, columns) => new Promise((resolve, reject) => {
	const sql = `SELECT * FROM \`${TABLE_NAME}\` WHERE \`_id\`=?`;
	pool.query(sql, id,
		(error, rows) => {
			if (error) {
				console.error(error);
				reject(error);
				return null;
			}
			resolve(rows.length === 1 ? rows : null);
		}
	)
});


exports.create = (user) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO \`${TABLE_NAME}\` SET ?`;
	if (!user) {
		reject("User is not defined or null");
		return -1;
	}
	user.password = bcrypt.hashSync(user.password, 12);
	console.log(user.password);
	pool.query(sql, user, (error, result) => {
		if (error) {
			console.error(error);
			reject(error);
			return -1;
		}
		resolve(result.insertId);
	});
});


exports.update = (user) => new Promise((resolve, reject) => {
	if (user.id === undefined || user.id === null || user.id < 1 || typeof user.id !== "number") {
		reject("user.id is either not defined or wrong");
	}
	let sql = `UPDATE \`${TABLE_NAME}\` SET ? WHERE \`_id\` = ${user.id}`;
	delete user['id'];
	pool.query(sql, user, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(rows);
	});
});
