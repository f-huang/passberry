"use strict";

// =====================================

const express = require('express');
const app = express();
const router = require('./controllers/router');

// =====================================

const port = process.env.PORT || 3001;
const middlewares = [
	express.static(require('path').join(__dirname, '../')),
	express.json(),
	express.urlencoded()
];
// const routes = [
// 	'/',
// 	'/sign-in',
// 	'/sign-up',
// ];

// =====================================

app.use(middlewares);
app.use('/', router);
// app.use((req, res, next) => {
// 	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
// 		if (error)
// 			res.status(500).send(error.message);
// 		else if (redirectLocation)
// 			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
// 		else if (renderProps)
// 			res.status(200);
// 		else
// 			res.status(404).send('Not found');
// 	})
// });

app.listen(port);

console.log(`Listening app at http://localhost:${port}`);

// =====================================

module.exports = app;