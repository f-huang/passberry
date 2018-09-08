const Qr = require("./QrModel");
const Token = require("../token/TokenModel");

const resolver = {
	Query: {
		QrGetValue: (_, { token }, context) => {
			const userId = Token.toId(token);
			// console.log(context.user);
			return Qr.getForUser(userId)
				.then(ret => ret.value)
				.catch(e => {
					console.error(e);
					return null
				})
		},

		QrRead: (_, { data }) => {
			return Qr.findUser(data)
				.then(ret => ret)
				.catch(e => null)
		}
	},
	Mutation: {
		qrGenerate: (_, { userId }) => {
			return Qr.generate(userId)
				.then(ret =>{
					console.log(ret);
					return ({ value: ret });
				})
				.catch(e => ({ value: e }))
		}
	}
};

module.exports = resolver;