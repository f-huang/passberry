const AttractionImage = require("./AttractionImageModel");

const resolver = {
	Query: {
		AttractionImage: (_, { id }) => {
			return AttractionImage.getById(id).then(rows);
		} ,
	},
	Mutation: {
		AttractionImageCreate: (_, { attractionId }) => {
			AttractionImage.create()
		},
	}
};

module.exports = resolver;