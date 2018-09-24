const Attraction = require("./AttractionModel");
const { getStatus, StatusCodeEnum } = require("../status");

const attraction = (input) => ({
	"name": input.name,
	...(input.description ? {"description": input.description} : {}),
	...(input.link ? {"link": input.link} : {}),
	"price_adult": input.price.adult,
	...(input.price.child ? {"price_child": input.price.child} : {}),
	...(input.price.maxAgeForChild ? {"price_max_age_for_child": input.price.maxAgeForChild} : {}),
	"type": input.type
});

const resolver = {
	Query: {
		getAttractionById: (_, { id }) => {
			return Attraction.get({ id: id }).then(rows => {
				return rows[0];
			});
		},
		getAllAttractions: (_, { limit = 0, sortField = "", sortOrder = "" }) => {
			return Attraction.getAll().then(rows => rows);
		}
	},
	Mutation: {
		createAttraction: (_, {input}) => {
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