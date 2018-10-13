const Attraction = require("./AttractionModel");
const AttractionImage = require('./AttractionImageModel');
const GraphqlUpload = require('graphql-upload');
const { getFileExtension } = require("../database/utils");
const { getStatus, StatusCodeEnum } = require("../status");

const fs = require('fs');
const path = require('path');
const UPLOAD_DIR = "../../../uploads/";

const saveImage = async (image, index) => {
	const { createReadStream, mimetype, encoding, filename } = await image;
	const rStream = createReadStream(filename);
	const extension = getFileExtension(filename);
	const newFilename = `${Date.now()+index+Math.floor(Math.random())}.${extension}`;
	const storingPath = path.join(__dirname + UPLOAD_DIR, newFilename);
	const wStream = fs.createWriteStream(storingPath);
	rStream.pipe(wStream);
	return storingPath;
};

const convertPathToImage = (path) => {
	const extension = getFileExtension(path);
	const body = fs.readFileSync(path, { encoding: 'base64' });
	return `data:image/${extension};base64,${body}`;
};

const attraction = (input) => ({
	"name": input.name,
	...(input.description ? {"description": input.description} : {}),
	...(input.link ? {"link": input.link} : {}),
	"price_adult": input.price.adult,
	...(input.price.child ? {"price_child": input.price.child} : {}),
	...(input.price.maxAgeForChild ? {"price_max_age_for_child": input.price.maxAgeForChild} : {}),
	"type": input.type,
	"address_street": input.address.street,
	...(input.address.supplement ? { "address_supplement": input.address.supplement } : {}),
	"address_city": input.address.city,
	"address_postcode": input.address.postcode,
	...(input.address.countryCode ? { "address_country_code": input.address.countryCode } : {}),
});

const attractionImage = (input) => ({
	"path": input.path,
	"attraction_id": input.attractionId
});

const formatAttraction = (attraction) => {
	attraction.price = {
		adult: parseFloat(attraction.priceAdult),
		child: attraction.priceChild ? parseFloat(attraction.priceChild) : null,
		student: attraction.priceStudent ? parseFloat(attraction.priceStudent) : null,
		maxAgeForChild: attraction.maxAgeForChild ? parseInt(attraction.maxAgeForChild, 10) : null
	};
	attraction.address = {
		street: attraction.addressStreet,
		supplement: attraction.addressSupplement,
		city: attraction.addressCity,
		postcode: attraction.addressPostcode,
		countryCode: attraction.addressCountryCode,
	};
	attraction.id = parseInt(attraction.id, 10);
	if (attraction.images) {
		attraction.images = attraction.images.split(',').map(path => convertPathToImage(path));
	}
	delete attraction['priceChild'];
	delete attraction['priceAdult'];
	delete attraction['maxAgeForChild'];
	delete attraction['addressStreet'];
	delete attraction['addressSupplement'];
	delete attraction['addressCity'];
	delete attraction['addressPostcode'];
	delete attraction['addressCountryCode'];
	return attraction;
};

const resolver = {
	Upload: GraphqlUpload,
	Query: {
		getAttractionById: (_, { id }) => {
			return Attraction.get({ id: id }).then(rows => {
				return rows[0] ? formatAttraction(rows[0]) : null;
			});
		},
		getAttractionByType: (_, { type }) => {
			return Attraction.get({ type: type }).then(rows =>
				rows.map(row => formatAttraction(row))
			);
		},
		getAllAttractions: (_, { limit = 0, sortField = "", sortOrder = "" }) => {
			return Attraction.getAll().then(rows =>
				rows.map(row => formatAttraction(row))
			);
		},
	},
	Mutation: {
		createAttraction: (_, { input }) => {
			return Attraction.create(attraction(input))
				.then(insertId => {
					input.id = insertId;
					input.images && input.images.map(async (image, index) => {
						saveImage(image, index).then(storingPath => {
							console.log("end --", storingPath);
							AttractionImage.create(attractionImage({
								attractionId: insertId,
								path: storingPath
							}))
						})
					});
					return {
						status: getStatus(StatusCodeEnum.success, 'OK'),
						attraction: input
					};
				})
				.catch(e => ({
					status: getStatus(StatusCodeEnum.serverSideError, e),
					attraction: input
				}));
		}
	}
};

module.exports = resolver;