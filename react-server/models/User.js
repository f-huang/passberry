"use strict";

const pool = require('../database/pool');
const query = require('../database/query');

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


const mapUserEntries = (user) => [
	{tableName: 'mail', value: user.email},
	{tableName: 'password', value: user.password},
	{tableName: 'first_name', value: user.firstName},
	{tableName: 'last_name', value: user.lastName},
	{tableName: 'gender', value: user.gender},
	{tableName: 'type', value: DEFAULT_USER_TYPE},
	{tableName: 'address_id', value: 1},
	// {tableName: 'birthday', value: user.dateOfBirth}
];


const getColumnsAsString = (columns, usual) => {
	let columnsAsString = "";
	if (columns.length === 0 || typeof columns === undefined) {
		columns = usual;
	}
	for (let i = 0; i < columns.length; i++) {
		columnsAsString += `\`${columns[i]}\`` + (i + 1 === columns.length ? "" : ",");
	}
	return columnsAsString;
};

const getValuesAsString = (columns)  => {
	let str = "";
	const count = (columns.match(/,/g) || []).length;
	if (count === 0)
		return str;
	for (let i = 0; i < count + 1; i++)
		str += (i === count) ? "?" : "?, ";
	return (str);
};


exports.exists = (email, callback) => {
	pool.query("SELECT `_id` FROM `user` WHERE `mail`=?", email,
		(error, rows) => {
			if (error) throw error;
			callback(rows.length === 1 ? rows[0] : undefined);
		}
	)
};


exports.getUserTypes = () => EnumUserType;


exports.getUser = (email, password, columns, callback) => {
	const columnsAsString = getColumnsAsString(columns, ['id', 'password']);

	pool.query(`SELECT ${columnsAsString} FROM \`user\` WHERE \`mail\`=?`, email,
		(error, rows) => {
			if (error) throw error;
			callback(rows.length === 1 && password === rows[0].password ? rows[0] : undefined);
		}
	)
};


exports.getUserById = (id, columns, callback) => {
	const columnsAsString = getColumnsAsString(columns, ['email']);

	pool.query(`SELECT ${columnsAsString} FROM \`user\` WHERE \`_id\`=?`, id,
		(error, rows) => {
			if (error) throw error;
			callback(rows.length === 1 ? rows[0] : undefined);
		}
	)
};


exports.addUser = (user, callback) => {

	const addIntoDb = (columns, values) => {
		const valuesAsString = getValuesAsString(columns);
		const sql = `INSERT INTO \`user\`(${columns}) VALUES(${valuesAsString})`;
		query(sql, values, (rows) => {
			callback(rows);
		});
	};

	const entries = mapUserEntries(user);

	let columns = "";
	let values = [];

	for (let entry of entries) {
		if (entry.value) {
			columns += `\`${entry.tableName}\`, `;
			values.push(entry.value);
		}
	}
	addIntoDb(columns.slice(0, -2), values);
};


exports.updateUser = (user, callback) => {
	const entries = mapUserEntries(user);
	let sql = `UPDATE \`user\` SET `;
	let values = [];

	for (let entry of entries) {
		if (entry.value) {
			sql += `\`${entry.tabIndex}\` = ?, `;
			values.push(entry.value);
		}
	}
	sql.slice(0, -2).concat(` WHERE \`_id\`= ?`);
	values.push(user.id);
	query(sql, values, (rows) => {
		callback(rows);
	});
};