const Pass = require('./PassModel');
const Ticket = require('./TicketModel');
const moment = require('moment');
const { getStatus, StatusCodeEnum } = require("../status");

const EXPIRE_INS = '7';

const pass = (input) => ({
	"user_id": input.pass.userId,
	"traveler_id": input.pass.travelerId,
	"basket_id": input.basketId,
	"start_date": input.startDate,
	"end_date": input.endDate
});

const ticketInput = (insertId, attractionId) => ({
	"pass_id": insertId,
	"attraction_id": attractionId
});

const resolver = {
	Query: {
		getPassByUserId: (_, { userId }) => {
			return Pass.getByUserId(userId).then(pass =>
				pass && pass.id ?
					Ticket.getPassTickets(pass.id).then(tickets => {
						pass.tickets = tickets;
						return {
							status: getStatus(StatusCodeEnum.success, 'OK'),
							pass: pass
						};
					}).catch(e => ({ status: getStatus(StatusCodeEnum.serverSideError, e)}))
					: {
						status: getStatus(StatusCodeEnum.success, 'OK'),
						pass: null
					}
			).catch(e => ({ status: getStatus(StatusCodeEnum.serverSideError, e)}))
		},
		getPassByTravelerId: (_, { travelerId }) => {
			return Pass.getByTravelerId(travelerId).then(pass =>
				pass && pass.id ?
					Ticket.getPassTickets(pass.id).then(tickets => {
						pass.tickets = tickets;
						return {
							status: getStatus(StatusCodeEnum.success, 'OK'),
							pass: pass
						};
					}).catch(e => ({ status: getStatus(StatusCodeEnum.serverSideError, e)}))
					: {
						status: getStatus(StatusCodeEnum.success, 'OK'),
						pass: null
					}

			).catch(e => ({ status: getStatus(StatusCodeEnum.serverSideError, e)}))
		}
	},
	Mutation: {
		createPass: (_, { input }) => {
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
						promises.push(Ticket.create(ticketInput(insertId, ticket.attractionId)).then(insertId =>
							ret.tickets.push({
								id: insertId,
								attractionId: ticket.attractionId,
								usedTime: null
							})
						));
					}
				});
				return Promise.all(promises).then(() => ({
					status: getStatus(StatusCodeEnum.success, 'OK'), pass: ret
				}));
			}).catch(e => ({ status: getStatus(StatusCodeEnum.serverSideError, e)}))
		},
		burnAttractionTicket: (_, { input }) => {
			return Ticket.update({
				'id': input.ticketId,
				'used_time': input.timestamp
			}).then(result => {
				Pass.init({
					'id': input.passId,
					'initTime': input.timestamp,
					'expirationTime': moment(input.timestamp).add(EXPIRE_INS, 'days')
				}).then(result => {
					Pass.getById(input.passId).then(pass => {
						Ticket.getPassTickets(input.passId).then(tickets => {
							pass.tickets = tickets;
							return ({
								status: getStatus(StatusCodeEnum.success, 'OK'),
								pass: pass
							})
						})
					});
				}).catch(e => ({ status: getStatus(StatusCodeEnum.serverSideError, e)}))
			}).catch(e => ({ status: getStatus(StatusCodeEnum.serverSideError, e)}))
		}
	}
};

module.exports = resolver;