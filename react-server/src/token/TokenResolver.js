"use strict";

const jwt = require("jsonwebtoken");
const Token = require("./TokenModel");

const JWT_SECRET = "temporarySecret";

const resolver = {
	Query:{
		convertTokenToId: async (_, { token }, context) => {
			return Token.toId(token);
		}
	}
};

module.exports = resolver;
