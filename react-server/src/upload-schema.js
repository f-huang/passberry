const typeDefs = `
	scalar Upload
	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}
`;

module.exports = typeDefs;