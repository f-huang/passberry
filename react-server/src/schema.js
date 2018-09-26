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
const tokenResolver = require("./token/TokenResolver");
const basketResolver = require("./basket/BasketResolver");
const paymentResolver = require("./payment/PaymentResolver");
const passResolver = require("./pass/PassResolver");

const resolvers = mergeResolvers([
	userResolver,
	attractionResolver,
	qrResolver,
	tokenResolver,
	basketResolver,
	paymentResolver,
	passResolver
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