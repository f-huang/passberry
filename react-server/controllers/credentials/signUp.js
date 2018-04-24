"use strict";

const router = require('express').Router();

const addUser = require('../../models/User').addUser;

router.post('/', (req, res) => {
	const user = req.body;

	addUser(user, (rows) => {
		if (user) {
			res.send("OK");
		}
		else {
			res.send("NO");

		}
	});
});

module.exports = router;
