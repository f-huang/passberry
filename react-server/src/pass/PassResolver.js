const Pass = require('./PassModel');
const Ticket = require('../ticket/TicketModel');
const moment = require('moment');
const { getStatus, StatusCodeEnum } = require("../status");

const EXPIRE_INS = '7';

const pass = (input) => ({
	"user_id": input.pass.userId,
	"traveler_id": input.pass.travelerId,
	"basket_id": input.basketId,
	"start_date": input.startDate,
	"end_date": input.endDate,
	"destination": input.destination
});

const ticketInput = (insertId, activityId) => ({
	"pass_id": insertId,
	"activity_id": activityId
});

const resolver = {
	Query: {
		getPassesByUserId: (_, { userId }) => {
			return Pass.getByUserId(userId).then(passes => {
				return { passes: passes };
			}).catch(e => { console.error(e); return { passes: null } })
		},
		getPassesByTravelerId: (_, { travelerId }) => {
			return Pass.getByTravelerId(travelerId).then(passes => {
				return { passes: passes };
			}).catch(e => { console.error(e); return { passes: null } })
		},
		getPassesByQr: (_, { qr }) => {
			return Pass.getByQr(qr).then(passes => {
				return { passes: passes };
			}).catch(e => { console.error(e); return { passes: null } })
		},
		getUserTravels: (_, { userId }) => {
			return Pass.getUserTravels(userId).then(rows => rows);
		}
	},
	Mutation: {
		createPass: (_, {input}) => {
			const ret = {
				userId: input.pass.userId,
				travelerId: input.pass.travelerId,
				tickets: []
			};
			const promises = [];
			return Pass.create(pass(input)).then(insertId => {
				ret.id = insertId;
				input.pass.tickets.forEach(ticket => {
					for (let i = 0; i < ticket.quantity; i++) {
						promises.push(Ticket.create(ticketInput(insertId, ticket.activityId)).then(insertId =>
							ret.tickets.push({
								id: insertId,
								activityId: ticket.activityId,
								usedTime: null
							})
						));
					}
				});
				return Promise.all(promises).then(() => ({
					status: getStatus(StatusCodeEnum.success, 'OK'), pass: ret
				}));
			}).catch(e => ({status: getStatus(StatusCodeEnum.serverSideError, e)}))
		},
		burnActivityTicket: (_, {input}) => {
			const promises = [];
			promises.push(Ticket.update({
					'id': input.ticketId,
					'used_time': input.timestamp
				}).catch(e => ({status: getStatus(StatusCodeEnum.serverSideError, e)}))
			);
			promises.push(Pass.init({
					'ticketId': input.ticketId,
					'initTime': input.timestamp,
					'expirationTime': moment(input.timestamp).add(EXPIRE_INS, 'days').format('YYYY-MM-DD hh:mm:ss')
				}).catch(e => ({status: getStatus(StatusCodeEnum.serverSideError, e)}))
			);
			return Promise.all(promises).then(() =>
				Pass.getByTicketId(input.ticketId).then(pass => {
					return ({
						status: getStatus(StatusCodeEnum.success, 'OK'),
						pass: pass
					});
				})
			);
		}
	}
};

module.exports = resolver;