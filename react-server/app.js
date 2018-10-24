"use strict";

// =====================================

const express = require('express');
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const jwt = require('express-jwt');
const graphqlHTTP = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload');

const schema = require('./src/schema');
const JWT_SECRET = "temporarySecret";

// =====================================
const apiEndPoint = '/graphql';
const port = process.env.PORT || 4000;
const middlewares = [
	express.static(require('path').join(__dirname, '../')),
	express.json(),
	express.urlencoded({extended: true}),
	helmet(),
	compression()
];

if (process.env.NODE_ENV === "production") {
	console.log("Production env");
	app.use(express.static("/var/www/vuego.fr/public_html/index.html"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve("/var/www/vuego.fr/public_html", "index.html"));
	});
}

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

app.use(apiEndPoint, cors(), bodyParser.json(), graphqlHTTP(req =>
	({
		schema: schema,
		context: { user: req.user },
		graphiql: process.env.NODE_ENV === 'development',
	})
));

app.listen(port);
console.log(`Listening app at http://vuego.fr:${port}`);

// =====================================

module.exports = app;
