const Attraction = require("./AttractionModel");
const { getStatus, StatusCodeEnum } = require("../status");

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

const formatAttraction = (attraction) => {
	attraction.price = {
		adult: parseFloat(attraction.priceAdult),
		child: attraction.priceChild,
		maxAgeForChild: attraction.priceMaxAgeForChild
	};
	parseInt(attraction.id, 10);
	delete attraction['priceChild'];
	delete attraction['priceAdult'];
	delete attraction['maxAgeForChild'];
	return attraction;
};

const resolver = {
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
		}
	},
	Mutation: {
		createAttraction: (_, { input }) => {
			return Attraction.create(attraction(input))
				.then(insertId => {
					input.id = insertId;
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