const Payment = require('./PaymentModel');

const resolver = {
	Mutation: {
		createPayment: (_, { input }) => {
			return Payment.create(input)
				.then(insertId => {
					return ({id: insertId, code: 0, message: 'OK'});
				})
				.catch(e => ({id: -1, code: -1, message: e}));
		}
	}
};

module.exports = resolver;