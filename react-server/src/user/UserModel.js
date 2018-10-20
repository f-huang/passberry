"use strict";

const bcrypt = require('bcrypt');
const pool = require('../database/pool');
const utils = require('../database/utils');

const TABLE_NAME = "user";
const COUNTRY_TABLE_NAME = "country";
const SCAN_TABLE_NAME = "scan";
const QR_TABLE_NAME = "qr_code";
const ACTIVITY_TABLE_NAME = "activity";
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

const COLUMNS = `\`${TABLE_NAME}\`.\`id\`, \`email\`, \`first_name\` AS \`firstName\`, \`last_name\` AS \`lastName\`,
	\`birthdate\`, \`gender\`, \`${TABLE_NAME}\`.\`type\`, 
	${TABLE_NAME}.\`address_street\` AS \`addressStreet\`, ${TABLE_NAME}.\`address_supplement\` AS \`addressSupplement\`,
	${TABLE_NAME}.\`address_city\` AS \`addressCity\`, ${TABLE_NAME}.\`address_postcode\` AS \`addressPostcode\`, ${COUNTRY_TABLE_NAME}.\`name\` AS \`addressCountry\`,
	${TABLE_NAME}.\`student\`, \`student_validated\` AS \`studentValidated\`, \`student_expiration_date\` AS \`studentExpirationDate\`
	
`;

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
	const sql = `SELECT \`id\` FROM \`${TABLE_NAME}\` WHERE \`email\` = ?`;
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


exports.get = (filters) => new Promise((resolve, reject) => {
	const sql = `SELECT ${COLUMNS} FROM \`${TABLE_NAME}\` WHERE ?`;
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
	const sql = `SELECT ${COLUMNS}  FROM \`${TABLE_NAME}\`
	`;
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


exports.getById = (id) => new Promise((resolve, reject) => {
	const sql = `SELECT ${COLUMNS} FROM \`${TABLE_NAME}\`
		LEFT OUTER JOIN ${COUNTRY_TABLE_NAME}
		ON ${COUNTRY_TABLE_NAME}.\`code\`=${TABLE_NAME}.\`address_country_code\`
		WHERE \`id\`=?
	`;
	pool.query(sql, id,
		(error, rows) => {
			if (error) {
				console.error(error);
				reject(error);
				return null;
			}
			resolve(rows.length === 1 ? rows[0] : null);
		}
	)
});


exports.getByScanId = (scanId) => new Promise((resolve, reject) => {
	const sql = `SELECT ${COLUMNS}, \`${QR_TABLE_NAME}\`.\`user_id\` FROM \`${SCAN_TABLE_NAME}\`
		INNER JOIN \`${ACTIVITY_TABLE_NAME}\`
		ON \`${ACTIVITY_TABLE_NAME}\`.\`id\`=\`${SCAN_TABLE_NAME}\`.\`activity_id\`
		INNER JOIN ${QR_TABLE_NAME}
		ON \`${SCAN_TABLE_NAME}\`.\`qr_code\`=\`${QR_TABLE_NAME}\`.\`value\`
		INNER JOIN \`${TABLE_NAME}\`
		ON \`${QR_TABLE_NAME}\`.\`user_id\`=\`${TABLE_NAME}\`.\`id\`
		LEFT OUTER JOIN ${COUNTRY_TABLE_NAME}
		ON ${COUNTRY_TABLE_NAME}.\`code\`=${TABLE_NAME}.\`address_country_code\`
		WHERE \`${SCAN_TABLE_NAME}\`.\`id\`=?
	`;
	pool.query(sql, scanId,
		(error, rows) => {
			if (error) {
				console.error(error);
				reject(error);
				return null;
			}
			resolve(rows.length === 1 ? rows[0] : null);
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
	let sql = `UPDATE \`${TABLE_NAME}\` SET ? WHERE \`id\` = ${user.id}`;
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
