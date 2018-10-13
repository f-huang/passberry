const VuegoPass = require('./VuegoPassModel');

const resolver = {
	Query: {
		getVuegoPassMustDo: (_, { destination }) => {
			return VuegoPass.getPassMustDo(destination)
				.then(pass => pass)
				.catch(e => { console.error(e); return null })
		}
	},
	Mutation: {

	}
};

module.exports = resolver;