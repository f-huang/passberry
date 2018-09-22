const Attraction = require("./AttractionModel");
const { getStatus, StatusCodeEnum } = require("../status");

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
			return Attraction.create(input)
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