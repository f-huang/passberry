const pool = require('../database/pool');

const Ticket = require('../ticket/TicketModel');

const TABLE_NAME = 'pass';
const TICKET_TABLE_NAME = 'ticket';
const QR_TABLE_NAME = 'qr_code';

const addTicketsToPass = (passes) => {
	const promises = [];
	passes.map(pass =>
		promises.push(Ticket.getPassTickets(pass.id).then(tickets => {
				pass.tickets = tickets.map(ticket => ({ ...ticket }))
			})
		));
	return Promise.all(promises).then(() => {
		// passes.map(pass => pass.tickets.map(ticket => console.log(ticket)));
		return (passes);
	})
};


exports.create = (pass) => new Promise((resolve, reject) => {
	pass.destination = pass.destination[0].toLocaleUpperCase() + pass.destination.slice(1).toLocaleLowerCase();
	const sql = `INSERT INTO ${TABLE_NAME} SET ?`;
	pool.query(sql, pass, (error, row) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(row.insertId);
	});
});

exports.update = (pass) => new Promise((resolve, reject) => {
	const sql = `UPDATE ${TABLE_NAME} SET ? WHERE id=${pass.id}`;
	pool.query(sql, pass, (error, row) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(row.insertId);
	});
});

exports.init = (pass) => new Promise((resolve, reject) => {
	const sql = `
		UPDATE ${TABLE_NAME} ${TABLE_NAME}
		INNER JOIN (
			SELECT p.\`id\` AS \`pass_id\`
			FROM ${TICKET_TABLE_NAME} t
			INNER JOIN ${TABLE_NAME} p
			ON t.\`pass_id\`=p.\`id\`
			WHERE t.\`id\`=?
		) ret ON ret.\`pass_id\`=${TABLE_NAME}.\`id\`
		SET
		\`init_time\` = IF(\`init_time\` IS NULL,? ,\`init_time\`), 
		\`expiration_time\` = IF(\`expiration_time\` IS NULL, ?, \`expiration_time\`)
	`;
	pool.query(sql, [pass.ticketId, pass.initTime, pass.expirationTime], (error, result) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		resolve(result);
	});
});

exports.getById = (id) => new Promise((resolve, reject) => {
	const sql = `SELECT
		\`id\`, \`user_id\` AS \`userId\`, \`traveler_id\` AS \`travelerId\`,
		\`init_time\` AS \`initTime\`, \`expiration_time\` AS \`expirationTime\` 
		FROM ${TABLE_NAME} WHERE id=?`;
	pool.query(sql, id, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		if (!rows || rows.length === 0) {
			resolve([]);
			return ;
		}
		resolve(addTicketsToPass(rows).then(rows => rows[0]));
	});
});

exports.getByTicketId = (ticketId) => new Promise((resolve, reject) => {
	const sql = `SELECT
		\`${TABLE_NAME}\`.\`id\`, \`user_id\` AS \`userId\`, \`traveler_id\` AS \`travelerId\`,
		\`init_time\` AS \`initTime\`, \`expiration_time\` AS \`expirationTime\` 
		FROM ${TABLE_NAME}
		INNER JOIN ${TICKET_TABLE_NAME}
		ON ${TABLE_NAME}.\`id\`=${TICKET_TABLE_NAME}.\`pass_id\`
		WHERE ${TICKET_TABLE_NAME}.\`id\`=?`;
	pool.query(sql, ticketId, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		if (!rows || rows.length === 0) {
			resolve([]);
			return ;
		}
		resolve(addTicketsToPass(rows).then(rows => rows[0]));
	});
});

exports.getByUserId = (userId) => new Promise((resolve, reject) => {
	const sql = `SELECT 
	\`id\`, \`user_id\` AS \`userId\`, \`traveler_id\` AS \`travelerId\`,
	\`init_time\` AS \`initTime\`, \`expiration_time\` AS \`expirationTime\` 
	FROM ${TABLE_NAME} WHERE \`user_id\`=?`;
	pool.query(sql, userId, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		if (!rows || rows.length === 0) {
			resolve([]);
			return ;
		}
		resolve(addTicketsToPass(rows));
	});
});

exports.getByTravelerId = (travelerId) => new Promise((resolve, reject) => {
	const sql = `SELECT 
	\`id\`, \`user_id\` AS \`userId\`, \`traveler_id\` AS \`travelerId\`,
	\`init_time\` AS \`initTime\`, \`expiration_time\` AS \`expirationTime\` 
	FROM ${TABLE_NAME} WHERE \`traveler_id\`=?`;
	pool.query(sql, travelerId, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		if (!rows || rows.length === 0) {
			resolve([]);
			return ;
		}
		resolve(addTicketsToPass(rows));
	});
});

exports.getByQr = (qr) => new Promise((resolve, reject) => {
	const sql = `SELECT 
		${TABLE_NAME}.\`id\`, ${TABLE_NAME}.\`user_id\` AS \`userId\`, ${TABLE_NAME}.\`traveler_id\` AS \`travelerId\`,
		\`init_time\` AS \`initTime\`, \`expiration_time\` AS \`expirationTime\`
		FROM ${TABLE_NAME}
		INNER JOIN ${QR_TABLE_NAME}
		ON ${QR_TABLE_NAME}.user_id=${TABLE_NAME}.traveler_id
		WHERE ${QR_TABLE_NAME}.\`value\`=?`;
	pool.query(sql, qr, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		if (!rows || rows.length === 0) {
			resolve([]);
			return ;
		}
		resolve(addTicketsToPass(rows));
	});
});




exports.getUserTravels = (userId) => new Promise((resolve, reject) => {
	const sql = `SELECT DISTINCT 
	\`destination\`, \`start_date\` AS \`startDate\`, \`end_date\` AS \`endDate\`, COUNT(*) AS \`numberOfTravelers\`
	FROM ${TABLE_NAME} WHERE \`user_id\`=?
	GROUP BY \`destination\`, \`start_date\`, \`end_date\`
`;
	pool.query(sql, userId, (error, rows) => {
		if (error) {
			console.error(error);
			reject(error);
			return null;
		}
		if (!rows || rows.length === 0) {
			resolve([]);
			return ;
		}
		resolve(rows);
	});
});
