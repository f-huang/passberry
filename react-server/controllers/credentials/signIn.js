"use strict";

const router = require('express').Router();

const getUser = require('../../models/User').getUser;

router.post('/', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	getUser(email, password, [], (user) => {
		if (user) {
			res.send("OK");
		}
		else {
			res.send("NO");

		}
	});
});

module.exports = router;
