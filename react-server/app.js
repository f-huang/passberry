"use strict";

// =====================================

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const graphqlHTTP = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload');
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
];

// =====================================
app.use(middlewares);
app.use(apiEndPoint, jwt({
	secret: JWT_SECRET,
	userProperty: 'user',
	credentialsRequired: false,
}));

app.use(apiEndPoint, graphqlUploadExpress({
	maxFileSize: 10000000,
	maxFiles: 10
}));

app.use(apiEndPoint, bodyParser.json(), graphqlHTTP(req =>
	({
		schema: schema,
		context: {user: req.user},
		graphiql: true,
	})
));

app.listen(port);
console.log(`Listening app at http://localhost:${port}`);

// =====================================

module.exports = app;
