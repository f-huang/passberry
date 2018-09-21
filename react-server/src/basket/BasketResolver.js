const Basket = require('./BasketModel');

const resolver = {
	Mutation: {
		createBasket: (_, { input }) => {
			console.log("Creating basket :", input);
			input.choices = JSON.stringify(input.choices);
			return Basket.create(input)
				.then(insertId => {
					return {id: insertId, code: 0, message: 'OK'};
				})
				.catch(e => ({id: -1, code: -1, message: e}));
		},
		updateBasket: (_, { input }) => {
			console.log("Updating basket :", input);
			input.choices = JSON.stringify(input.choices);
			return Basket.update(input)
				.then(insertId => {
					return {id: insertId, code: 0, message: 'OK'};
				})
				.catch(e => ({id: -1, code: -1, message: e}));
		},
		validateBasket: (_, { input }) => {
			// update basket state and userId
			console.log("Updating basket :", input);
			return Basket.validate(input.state, input.user_id, input.basket_id)
				.then(insertId => {
					return {id: input.basket_id, code: 0, message: 'OK'};
				})
				.catch(e => ({id: -1, code: -1, message: e}));
		}

	}
};

module.exports = resolver;