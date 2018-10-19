const Attraction = require("./AttractionModel");
const AttractionImage = require('./AttractionImageModel');
const GraphqlUpload = require('graphql-upload');

const { convertPathToImage } = require("../imageUtils");
const { saveImage } = require("../imageUtils");
const { getStatus, StatusCodeEnum } = require("../status");


const parent = (input) => ({
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


const resolver = {
	Upload: GraphqlUpload,
	Query: {
		getAttractionById: (_, { id }) => {
			return Attraction.get({ id: id }).then(rows => {
				return rows[0] ? (rows[0]) : null;
			});
		},
		getAttractionsByType: (_, { type }) => {
			return Attraction.get({ type: type }).then(rows =>
				rows.map(row => (row))
			);
		},
		getAllAttractions: (_, { limit = 0, sortField = "", sortOrder = "" }) => {
			return Attraction.getAll().then(rows =>
				rows.map(row => (row))
			);
		},
	},
	Mutation: {
		createAttraction: (_, { input }) => {
			return Attraction.create(parent(input))
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
	},
	Attraction: {
		id: parent => parseInt(parent.id, 10),
		name: parent => parent.name,
		description: parent => parent.description,
		link: parent => parent.link,
		type: parent => parent.type,
		price: parent => ({
			adult: parseFloat(parent.priceAdult),
			child: parent.priceChild ? parseFloat(parent.priceChild) : null,
			student: parent.priceStudent ? parseFloat(parent.priceStudent) : null,
			maxAgeForChild: parent.maxAgeForChild ? parseInt(parent.maxAgeForChild) : null
		}),
		address: parent => ({
			street: parent.addressStreet,
			supplement: parent.addressSupplement,
			city: parent.addressCity,
			postcode: parent.addressPostcode,
			countryCode: parent.addressCountryCode,
		}),
		images: parent => parent.images ? parent.images.split(',').map(path => convertPathToImage(path)) : null
	}
};

module.exports = resolver;