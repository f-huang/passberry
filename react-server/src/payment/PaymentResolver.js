const resolver = {
	Mutation: {
		paymentCreate: (_, { payment }) => {
			return payment.create(payment)
				.then(insertId => {
					return ({id: insertId, code: 0, message: 'OK'});
				})
				.catch(e => ({id: -1, code: -1, message: e}));
		}
	}
};

module.exports = resolver;