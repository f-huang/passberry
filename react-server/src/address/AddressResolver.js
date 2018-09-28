const Address = require('./AddressModel');

const resolver = {
	Query: {
		getAddressById: (_, { id }) => {
			return Address.getById(id).then(address => address)
				.catch(e => e)
		}
	}
};

module.exports = resolver;