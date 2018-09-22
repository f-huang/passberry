"use strict";

const User = require("./UserModel");
const Token = require("../token/TokenModel");
const Qr = require("../qr/QrModel");

const { getStatus, StatusCodeEnum } = require("../status");

const user = (input) => ({
	"email": input.email,
	"first_name": input.first_name,
	"last_name": input.lastName,
	"password": input.password,
	"gender": input.gender,
	"birthdate": input.birthdate,
});

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
			if (!input.email || !input.password)
				return { status: getStatus(StatusCodeEnum.clientSideError, "Wrong input"), token: null};
			return User.connect(input.email, input.password)
				.then(ret => {
					try {
						const token = Token.generate(input, ret.id);
						return { status: getStatus(StatusCodeEnum.success, 'OK'), token: token };
					} catch (e) {
						console.error(e);
					}
				})
				.catch(e => ({ status: getStatus(StatusCodeEnum.serverSideError, e), token: null }));
		},
		signUp: (_, { input }, context) => {
			if (!input.email || !input.password)
				return { status: getStatus(StatusCodeEnum.clientSideError, "Wrong input"), token: null};
			return User.create(user(input))
				.then(userId => {
					Qr.generate(userId);
					const token = Token.generate(user, userId);
					return { status: getStatus(StatusCodeEnum.success, 'OK'), token: token };
				})
				.catch(e => ({ status: getStatus(StatusCodeEnum.serverSideError, e), token: null }));
		}
	}
};

module.exports = resolver;