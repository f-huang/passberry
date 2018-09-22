"use strict";

const {getStatus, StatusCodeEnum} = require("../status");

const jwt = require("jsonwebtoken");
const Token = require("./TokenModel");

const JWT_SECRET = "temporarySecret";

const resolver = {
	Query:{
		convertTokenToId: async (_, { token }, context) => {
			const id = Token.toId(token);
			if (!token || !Token.isValid(token) || id === -1)
				return {
					token: token,
					id: 0,
					status: getStatus(StatusCodeEnum.clientSideError, 'Wrong token')
				};
			return {
				token: token,
				id: Token.toId(token),
				status: getStatus(StatusCodeEnum.success, 'OK')
			};
		}
	}
};

module.exports = resolver;
