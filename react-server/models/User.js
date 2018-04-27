"use strict";

const pool = require('../database/pool');


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


const getUserTable = (user) => [
	{column: 'mail', value: user.email},
	{column: 'password', value: user.password},
	{column: 'first_name', value: user.firstName},
	{column: 'last_name', value: user.lastName},
	{column: 'gender', value: user.gender},
	{column: 'type', value: DEFAULT_USER_TYPE},
	{column: 'country_code', value: user.country},
	{column: 'birthday', value: user.birthday}
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

	function getValuesAsString(columns) {
		let str = "";
		const count = (columns.match(/,/g) || []).length;
		if (count === 0)
			return str;
		for (let i = 0; i < count + 1; i++)
			str += (i === count) ? "?" : "?, ";
		return (str);
	}

	function addIntoDb(columns, values) {
		const valuesAsString = getValuesAsString(columns);
		const query = `INSERT INTO \`user\`(${columns}) VALUES(${valuesAsString})
				ON DUPLICATE KEY UPDATE 
			`;

		pool.query(query, values, (error, rows) => {
			if (error) throw error;
			callback(rows);
		});
	}
	const table = getUserTable(user);

	let columns = "";
	let values = [];

	for (let entry of table) {
		if (!entry.value)
			continue ;
		columns += `\`${entry.column}\`, `;
		values.push(entry.value);
	}
	addIntoDb(columns.slice(0, -2), values);
};


exports.updateUser = (user, callback) => {
	const table = getUserTable(user);
	let query = `UPDATE \`user\` SET `;
	let values = [];

	for (let entry of table) {
		if (!entry.value)
			continue ;
		query += `\`${entry.column}\` = ?, `;
		values.push(entry.value);
	}
	query.slice(0, -2).concat(` WHERE \`_id\`=${user.id}`);
	pool.query(query, values, (error, rows) => {
		if (error) throw error;
		callback(rows);
	});
};