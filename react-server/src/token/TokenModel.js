"use strict";
const pool = require("../database/pool");
const jwt = require("jsonwebtoken");

const TABLE_NAME = "token";

const EXPIRATION_TIME = "1y";

const JWT_SECRET = "temporarySecret";

const getExpirationTime = (token) => {
	const exp = jwt.decode(token).exp;
	return exp ? exp : null;
};

const toDateTime = (time) => time ? new Date(time * 1000) : time;

exports.generate = (email, userId) => {
	return jwt.sign(
		{
			id: userId,
			email: email,
		},
		JWT_SECRET,
		{ expiresIn: '1y' }
	);
};

exports.toId = (token) => jwt.verify(token, JWT_SECRET, (err, token) => {
	if (err)
		return -1;
	else
		return token.id;
});

exports.create = (token, userId) => new Promise((resolve, reject) => {
	const sql = `INSERT INTO ${TABLE_NAME} SET ?`;
	const values = { value: token, user_id: userId, expiration_time: toDateTime(getExpirationTime(token)) };
	pool.query(sql, values,
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

exports.isValid = (token) => new Promise((resolve, reject) => {
	const sql = `SELECT 
		\`expiration_time\` as \`expirationTime\`
		\`user_id\` as \`userId\`
		 FROM \`${TABLE_NAME}\` WHERE \`value\` = ?`;
	pool.query(sql, token,
		(error, rows) => {
			if (error) {
				console.error(error);
				reject(error);
				return false;
			}
			resolve(rows.len > 0 && rows[0].expirationTime < Date.now())
		}
	);
});

