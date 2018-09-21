"use strict";

const User = require("./UserModel");
const Token = require("../token/TokenModel");
const Qr = require("../qr/QrModel");

const resolver = {
	Query: {
		getUserById: (_, { id }) => {
			return User.getById(id).then(rows => rows[0])
		},
		getAllUsers: (_, { limit = 0, sortField = "", sortOrder = "" }) => {
			return User.getAll().then(rows => rows)
		}
	},
	Mutation: {
		signIn: (_, { input }, context) => {
			return User.connect(input.email, input.password)
				.then(ret => {
					try {
						const token = Token.generate(input, ret._id);
						return { message: "OK", code: "0", token: token };
					} catch (e) {
						console.error(e);
					}
				})
				.catch(e => ({ message: e, code: "-1", token: null }));
		},
		signUp: (_, { input }, context) => {
			return User.create(input)
				.then(userId => {
					Qr.generate(userId);
					const token = Token.generate(user, userId);
					return { message: "OK", code: "0", token: token };
				})
				.catch(e => ({ message: e, code: "-1", token: null }));
		}
	}
};

module.exports = resolver;