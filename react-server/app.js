"use strict";

// =====================================

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const graphqlHTTP = require('express-graphql');
const session = require("express-session");
const schema = require('./src/schema');
const jwt = require('express-jwt');

const JWT_SECRET = "temporarySecret";

// =====================================
const apiEndPoint = '/graphql';
const port = process.env.PORT || 4000;
const middlewares = [
	express.static(require('path').join(__dirname, '../')),
	express.json(),
	express.urlencoded({extended: true}),
	session({
		secret: JWT_SECRET,
		resave: false,
		saveUninitialized: true,
		// cookie: { secure: true }
	})
];

// =====================================
app.use(middlewares);
app.use(apiEndPoint, jwt({
	secret: JWT_SECRET,
	userProperty: 'user',
	credentialsRequired: false,
}));

app.use(apiEndPoint, bodyParser.json(), (req, res) => {
	console.log("req.user = " , req.user);
	return graphqlHTTP({
		schema: schema,
		context: { user: req.user  },
		graphiql: true,
	}) (req, res);
});

app.listen(port);
console.log(`Listening app at http://localhost:${port}`);

// =====================================

module.exports = app;
