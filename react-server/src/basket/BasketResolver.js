const Basket = require('./BasketModel');

const resolver = {
	Mutation: {
		basketCreate: (_, { basket }) => {
			console.log("Creating basket :", basket);
			basket.choices = JSON.stringify(basket.choices);
			return Basket.create(basket)
				.then(insertId => {
					return {id: insertId, code: 0, message: 'OK'};
				})
				.catch(e => ({id: -1, code: -1, message: e}));
		},
		basketUpdate: (_, { basket }) => {
			console.log("Updating basket :", basket);
			basket.choices = JSON.stringify(basket.choices);
			return Basket.update(basket)
				.then(insertId => {
					return {id: insertId, code: 0, message: 'OK'};
				})
				.catch(e => ({id: -1, code: -1, message: e}));
		},
		basketValidate: (_, { payment }) => {
			// update basket state and userId
			console.log("Updating basket :", payment);
			return Basket.validate(payment.state, payment.user_id, payment.basket_id)
				.then(insertId => {
					return {id: payment.basket_id, code: 0, message: 'OK'};
				})
				.catch(e => ({id: -1, code: -1, message: e}));
		}

	}
};

module.exports = resolver;