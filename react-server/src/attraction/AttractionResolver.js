const Attraction = require("./AttractionModel");

const resolver = {
	Query: {
		AttractionGet: (_, { id }) => {
			return Attraction.get({ _id: id }).then(rows => {
				return rows[0];
			});
		},
		AttractionGetAll: (_, { limit = 0, sortField = "", sortOrder = "" }) => {
			return Attraction.getAll().then(rows => rows);
		}
	},
	Mutation: {
		attractionCreate: (_, { attraction }) => {
			return Attraction.create(attraction)
				.then(ret => {
					console.log(ret);
					return { id: ret, code: 0, message: "OK"};
				})
				.catch(e => ({ id: - 1, code: -1, message: e }));
		}
	}
};

module.exports = resolver;