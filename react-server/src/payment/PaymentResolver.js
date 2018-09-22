const Payment = require('./PaymentModel');
const { getStatus, StatusCodeEnum } = require("../status");

const resolver = {
	Mutation: {
		createPayment: (_, { input }) => {
			return Payment.create(input)
				.then(insertId => {
					return {
						status: getStatus(StatusCodeEnum.success, 'OK'),
						payment: input
					};
				})
				.catch(e => ({
					status: getStatus(StatusCodeEnum.serverSideError, e),
					payment: input
				}));
		}
	}
};

module.exports = resolver;