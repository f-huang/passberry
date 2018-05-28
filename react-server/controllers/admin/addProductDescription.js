"use strict";

const router = require('express').Router();

const country = require('../../models/CountryModel');
const address = require('../../models/AddressModel');
const product = require('../../models/ProductDescriptionModel');
const productImage = require('../../models/ProductDescriptionImagesModel');

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
			product.addProductDescription(form);
		})
		.then((insertId) => {
			productImage.addImage(insertId, req.files);
		})
		.then(() => {
			res.send("OK");
		})
		.catch(() => {
			res.send("NO");
		});
});

module.exports = router;
