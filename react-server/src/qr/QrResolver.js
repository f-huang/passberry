const Qr = require("./QrModel");
const Token = require("../token/TokenModel");

const { getStatus, StatusCodeEnum } = require('../status');

const resolver = {
	Query: {
		getQrByToken: (_, { token }, context) => {
			const userId = Token.toId(token);
			// console.log(context.user);
			return Qr.getByUserId(userId)
				.then(ret => ret.value)
				.catch(e => {
					console.error(e);
					return null
				})
		},
		getQrByUserId: (_, { userId }) => {
			return Qr.getByUserId(userId)
				.then(ret => ret.value)
				.catch(e => { console.error(e); return null })
		},

		readQr: (_, { data }) => {
			return Qr.findUser(data)
				.then(ret => ret)
				.catch(e => null)
		}
	},
	Mutation: {
		generateQr: (_, { input }) => {
			return Qr.generate(input.userId)
				.then(insertId =>{
					return ({
						status: getStatus(StatusCodeEnum.success, 'OK'),
						qrId: insertId,
						userId: input.userId
					});
				})
				.catch(e => ({
					status: getStatus(StatusCodeEnum.serverSideError, 'OK'),
					value: null,
					userId: input.userId
				}))
		}
	}
};

module.exports = resolver;