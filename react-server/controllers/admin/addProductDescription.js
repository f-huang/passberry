"use strict";

const router = require("express").Router();
const crypto = require ("crypto");
const mime = require ("mime");
const multer = require('multer');

const country = require('../../models/CountryModel');
const address = require('../../models/AddressModel');
const product = require('../../attraction/AttractionModel');
const productImage = require('../../attraction/AttractionImageModel');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null,  __dirname + '/../../uploads/')
	},
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
			cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
		});
	}
});
const upload = multer({ storage: storage });

router.post('/', upload.array('images', 8), (req, res) => {
	let form = req.body;
	country.getCountryByName(form.country)
		.then((code) => { return {...form, ...{countryCode: code }}; })
		.then(form => address.addAddress(form))
		.then(addressId => product.addProductDescription({...form, ...{addressId: addressId }}))
		.then(descriptionId => {
			if (req.files) {
				productImage.addImage(descriptionId, req.files);
			}
		})
		.then(() => res.send("OK"))
		.catch((error) => res.send(error));
});

module.exports = router;
