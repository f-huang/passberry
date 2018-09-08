"use strict";

const jwt = require("jsonwebtoken");
const Token = require("./TokenModel");

const JWT_SECRET = "temporarySecret";

const resolver = {
	Query:{
		TokenConvertToId: async (_, { token }, context) => {
			return Token.toId(token);
		}
	}
};

module.exports = resolver;
