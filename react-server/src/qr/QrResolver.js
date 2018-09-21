const Qr = require("./QrModel");
const Token = require("../token/TokenModel");

const resolver = {
	Query: {
		getQrValue: (_, { token }, context) => {
			const userId = Token.toId(token);
			// console.log(context.user);
			return Qr.getForUser(userId)
				.then(ret => ret.value)
				.catch(e => {
					console.error(e);
					return null
				})
		},

		readQr: (_, { data }) => {
			return Qr.findUser(data)
				.then(ret => ret)
				.catch(e => null)
		}
	},
	Mutation: {
		generateQr: (_, { input }) => {
			return Qr.generate(input)
				.then(ret =>{
					console.log(ret);
					return ({ value: ret });
				})
				.catch(e => ({ value: e }))
		}
	}
};

module.exports = resolver;