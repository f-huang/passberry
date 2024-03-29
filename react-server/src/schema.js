const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');
const path = require('path');
const uploadSchema = require('./upload-schema');

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
const travelerResolver = require("./traveler/TravelerResolver");
const attractionResolver = require("./activity/ActivityResolver");
const qrResolver = require("./qr/QrResolver");
const scanResolver = require("./scan/ScanResolver");
const entryResolver = require("./entry/EntryResolver");
const tokenResolver = require("./token/TokenResolver");
const basketResolver = require("./basket/BasketResolver");
const paymentResolver = require("./payment/PaymentResolver");
const passResolver = require("./pass/PassResolver");
const vuegoPassResolver = require("./vuego_pass/VuegoPassResolver");
const ticketResolver = require("./ticket/TicketResolver");

const resolvers = mergeResolvers([
	userResolver,
	travelerResolver,
	attractionResolver,
	qrResolver,
	scanResolver,
	entryResolver,
	tokenResolver,
	basketResolver,
	paymentResolver,
	passResolver,
	vuegoPassResolver,
	ticketResolver
]);

const typeDefs = [ uploadSchema, fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8') ];

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
	resolverValidationOptions: {
		requireResolversForResolveType: false
	},
	logger: { log: e => console.log(e) }
});

module.exports = schema;