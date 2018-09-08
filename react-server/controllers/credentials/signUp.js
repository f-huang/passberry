"use strict";

const router = require('express').Router();

const user = require('../../user/UserModel');
const country = require('../../models/CountryModel');
const address = require('../../models/AddressModel');

router.post('/', (req, res) => {
	const form = req.body;
	country.getCountryByName(form.country)
		.then((code) => {
			return {...form, ...{countryCode: code }};
		})
		.then((form) => {
			address.addAddress(form)
		})
		.then((addressId) => {
			form.addressId = addressId;
			user.addUser(form);
		})
		.then((insertId) => {
			res.send("OK");
		})
	.catch(() => {
		res.send("NO");
	});
});

module.exports = router;
