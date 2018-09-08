const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');
const path = require('path');

// Resolvers
const mergeResolvers = (resolvers) => {
	let ret = {};
	resolvers.forEach(resolver => {
		Object.keys(resolver).forEach(key => {
			if (typeof resolver[key] === "object") {
				ret[key] = {...ret[key], ...resolver[key]};
			} else {
				ret[key] = resolver[key];
			}
		})
	});
	return ret;
};

const userResolver = require("./user/UserResolver");
const attractionResolver = require("./attraction/AttractionResolver");
const qrResolver = require("./qr/QrResolver");
const responseResolver = require("./ResponseResolver");
const tokenResolver = require("./token/TokenResolver");

const resolvers = mergeResolvers([
	responseResolver,
	userResolver,
	attractionResolver,
	qrResolver,
	tokenResolver
]);

const typeDefs = [ fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8') ];

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
	resolverValidationOptions: {
		requireResolversForResolveType: false
	},
	logger: { log: e => console.log(e) }
});

module.exports = schema;