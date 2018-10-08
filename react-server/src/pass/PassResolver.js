const Pass = require('./PassModel');
const PassToAttraction = require('./PassToAttractionModel');
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

const passAttraction = (insertId, attractionId) => ({
	"pass_id": insertId,
	"attraction_id": attractionId
});

const resolver = {
	Query: {
		getPassByUserId: (_, { userId }) => {
			return Pass.getByUserId(userId).then(pass =>
				PassToAttraction.getPassAttractions(pass.id).then(attractions => {
					pass.attractions = attractions;
					return {
						status: getStatus(StatusCodeEnum.success, 'OK'),
						pass: pass
					};
				}).catch(e => ({ status: getStatus(StatusCodeEnum.serverSideError, e)}))
			).catch(e => ({ status: getStatus(StatusCodeEnum.serverSideError, e)}))
		},
		getPassByTravelerId: (_, { travelerId }) => {
			return Pass.getByTravelerId(travelerId).then(pass =>
				PassToAttraction.getPassAttractions(pass.id).then(attractions => {
					pass.attractions = attractions;
					return {
						status: getStatus(StatusCodeEnum.success, 'OK'),
						pass: pass
					};
				}).catch(e => ({ status: getStatus(StatusCodeEnum.serverSideError, e)}))

			).catch(e => ({ status: getStatus(StatusCodeEnum.serverSideError, e)}))
		}
	},
	Mutation: {
		createPass: (_, { input }) => {
			const ret = {
				userId: input.pass.userId,
				travelerId: input.pass.travelerId,
				attractions: []
			};
			const promises = [];
			return Pass.create(pass(input)).then(insertId => {
				ret.id = insertId;
				input.pass.tickets.forEach(ticket => {
					for (let i = 0; i < ticket.quantity; i++) {
						promises.push(PassToAttraction.create(passAttraction(insertId, ticket.attractionId)).then(insertId =>
							ret.attractions.push({
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
			return PassToAttraction.update({
				'id': input.ticketId,
				'used_time': input.timestamp
			}).then(result => {
				Pass.init({
					'id': input.passId,
					'initTime': input.timestamp,
					'expirationTime': moment(input.timestamp).add(EXPIRE_INS, 'days')
				}).then(result => {
					Pass.getById(input.passId).then(pass => {
						PassToAttraction.getPassAttractions(input.passId).then(attractions => {
							pass.attractions = attractions;
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