const Traveler = require('./TravelerModel');

const resolver = {
	Query: {
		getTravelersByUserId: (_, { userId }) => {
			return Traveler.getByUserId(userId)
				.then(travelers => travelers)
				.catch(e => { console.error(e); return null });
		}
	},
	Mutation: {
	}
};

module.exports = resolver;