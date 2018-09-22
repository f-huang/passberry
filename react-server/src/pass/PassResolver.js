const Pass = require('./PassModel');
const PassToAttraction = require('./PassToAttractionModel');
const moment = require('moment');

const EXPIRE_INS = '7';

const resolver = {
	Mutation: {
		createTravelersPasses: (_, { input }) => {
			const travelerIds = [...new Set(input.choices.map(choice => choice.user_id))];
			const ret = [];
			console.log("travelerIds :", travelerIds);
			travelerIds.forEach(travelerId => {
				const pass = {
					"user_id": input.user_id,
					"traveler_id": travelerId,
					"basket_id": input.id,
					// "start_date": startDate,
					// "end_date": endDate
				};
				const userAttractions = input.choices.filter(choice => choice.user_id === travelerId);
				console.log("userAttractions :", userAttractions);
				Pass.create(pass).then(insertId => {
					userAttractions.forEach(attraction => {
							for (let i = 0; i < attraction.quantity; i++) {
								PassToAttraction.create({
									"pass_id": insertId,
									"attraction_id": attraction.id
								}).catch(e => console.error(e))
							}
						}
					);
					ret.push({passId: insertId , travelerId: travelerId});
				}).catch(e => console.error(e));
				return ret;
			});
		},
		burnAttractionTicket: (_, { input }) => {
			return PassToAttraction.update({
				'id': input.attraction_id,
				'used_time': input.timestamp
			}).then(result => {
				Pass.update({
					'id': input.pass_id,
					'init_time': input.timestamp,
					'expiration_time': moment(input.timestamp).add(EXPIRE_INS, 'days')
				}).then(result => {
					return ({code: 0, message: 'OK'});
				})
			})

		},
	}
};

module.exports = resolver;