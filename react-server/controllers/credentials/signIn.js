"use strict";

const router = require('express').Router();

router.post('/', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
});

module.exports = router;
