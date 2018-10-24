const { getStatus, StatusCodeEnum } = require("../status");

const Traveler = require('./TravelerModel');
const User = require('../user/UserModel');
const Token = require("../token/TokenModel");
const Qr = require("../qr/QrModel");

const traveler = (input) => ({
	"first_name": input.firstName,
	...(input.last_name ? {"last_name": input.lastName} : {}),
	...(input.birthdate ? { "birthdate": input.birthdate } : {}),
	...(input.isStudent ? {"student": input.isStudent} : {})
});

const resolver = {
	Query: {
		getTravelersByUserId: (_, { userId }) => {
			return Traveler.getByUserId(userId)
				.then(travelers => travelers)
				.catch(e => { console.error(e); return [] });
		},
		getTravelerByQr: (_, { qr }) => {
			return Traveler.getByQr(qr)
				.then(travxeler => traveler)
				.catch(e => { console.error(e); return null });
		}
	},
	Mutation: {
		createTraveler: (_, { input }) => {
			return User.create(traveler(input))
				.then(travelerId => {
					Qr.generate(travelerId);
					return ({status: getStatus(StatusCodeEnum.success, 'OK'), traveler: {...input, id: travelerId}})
				})
				.catch(e => ({status: getStatus(StatusCodeEnum.serverSideError, e), traveler: null}));
		}
	}
};

module.exports = resolver;