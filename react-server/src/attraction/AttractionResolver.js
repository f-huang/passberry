const Attraction = require("./AttractionModel");
const AttractionImage = require('./AttractionImageModel');
const Country = require('../country/CountryModel');
const GraphqlUpload = require('graphql-upload');

const { convertPathToImage } = require("../imageUtils");
const { saveImage } = require("../imageUtils");
const { getStatus, StatusCodeEnum } = require("../status");


const parent = (input) => ({
	"name": input.name,
	...(input.description ? {"description": input.description} : {}),
	...(input.link ? {"link": input.link} : {}),
	...(input.noQueuing ? {"no_queuing": input.noQueuing} : {}),
	"price_adult": input.price.adult,
	...(input.price.child ? {"price_child": input.price.child} : {}),
	...(input.price.maxAgeForChild ? {"price_max_age_for_child": input.price.maxAgeForChild} : {}),
	"type": input.type,
	"address_street": input.address.street,
	...(input.address.supplement ? { "address_supplement": input.address.supplement } : {}),
	"address_city": input.address.city,
	"address_postcode": input.address.postcode,
	...(input.address.countryCode ? { "address_country_code": input.address.countryCode } : {}),
	...(input.openingTimes[0].timeSlot ? { "opening_times_monday": input.openingTimes[0].timeSlot } : {}),
	...(input.openingTimes[0].secondTimeSlot ? { "opening_times_monday2": input.openingTimes[0].secondTimeSlot } : {}),
	...(input.openingTimes[1].timeSlot ? { "opening_times_tuesday": input.openingTimes[1].timeSlot } : {}),
	...(input.openingTimes[1].secondTimeSlot ? { "opening_times_tuesday2": input.openingTimes[1].secondTimeSlot } : {}),
	...(input.openingTimes[2].timeSlot ? { "opening_times_wednesday": input.openingTimes[2].timeSlot } : {}),
	...(input.openingTimes[2].secondTimeSlot ? { "opening_times_wednesday2": input.openingTimes[2].secondTimeSlot } : {}),
	...(input.openingTimes[3].timeSlot ? { "opening_times_thursday": input.openingTimes[3].timeSlot } : {}),
	...(input.openingTimes[3].secondTimeSlot ? { "opening_times_thursday2": input.openingTimes[3].secondTimeSlot } : {}),
	...(input.openingTimes[4].timeSlot ? { "opening_times_friday": input.openingTimes[4].timeSlot } : {}),
	...(input.openingTimes[4].secondTimeSlot ? { "opening_times_friday2": input.openingTimes[4].secondTimeSlot } : {}),
	...(input.openingTimes[5].timeSlot ? { "opening_times_saturday": input.openingTimes[5].timeSlot } : {}),
	...(input.openingTimes[5].secondTimeSlot ? { "opening_times_saturday2": input.openingTimes[5].secondTimeSlot } : {}),
	...(input.openingTimes[6].timeSlot ? { "opening_times_sunday": input.openingTimes[6].timeSlot } : {}),
	...(input.openingTimes[6].secondTimeSlot ? { "opening_times_sunday2": input.openingTimes[6].secondTimeSlot } : {}),
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
			//TODO: check openingTimes format (xxhxx-xxhxx)
			if (input.openingTimes.length !== 7)
				return {
					status: getStatus(StatusCodeEnum.clientSideError, 'openingTimes.length !== 7'),
					attraction: input
				};
			return Country.getCountryByName(input.address.country).then(countryCode => {
				input.address.countryCode = countryCode;
				return Attraction.create(parent(input))
					.then(insertId => {
						console.log(countryCode);
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
					}))
			});
		}
	},
	Attraction: {
		id: parent => parseInt(parent.id, 10),
		name: parent => parent.name,
		description: parent => parent.description,
		link: parent => parent.link,
		type: parent => parent.type,
		noQueuing: parent => parent.noQueuing === 1,
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
			country: parent.addressCountry,
		}),
		openingTimes: parent => ([
			{ timeSlot: parent.openingTimesMonday, secondTimeSlot: parent.openingTimesMonday2 },
			{ timeSlot: parent.openingTimesTuesday, secondTimeSlot: parent.openingTimesTuesday2 },
			{ timeSlot: parent.openingTimesWednesday, secondTimeSlot: parent.openingTimesWednesday2 },
			{ timeSlot: parent.openingTimesThursday, secondTimeSlot: parent.openingTimesThursday2 },
			{ timeSlot: parent.openingTimesFriday, secondTimeSlot: parent.openingTimesFriday2 },
			{ timeSlot: parent.openingTimesSaturday, secondTimeSlot: parent.openingTimesSaturday2 },
			{ timeSlot: parent.openingTimesSunday, secondTimeSlot: parent.openingTimesSunday2 },
		]),
		images: parent => parent.images ? parent.images.split(',').map(path => convertPathToImage(path)) : null
	}
};

module.exports = resolver;