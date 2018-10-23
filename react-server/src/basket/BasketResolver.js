const Basket = require('./BasketModel');

const { getStatus, StatusCodeEnum } = require("../status");

const basketForCreate = (input) => ({
	"init_time": input.initTime,
	"last_update_time": input.lastUpdateTime,
	...(input.userId ? {"user_id": input.userId} : {}),
	"items": input.items
});

const basketForUpdate = (input) => ({
	...(input.userId ? {"user_id": input.userId} : {}),
	"id": input.basketId,
	"last_update_time": input.lastUpdateTime
});

const basketForValidate = (input) => ({
	"id": input.basketId,
	"user_id": input.userId,
	"state": input.state
});


const resolver = {
	Mutation: {
		createBasket: (_, { input }) => {
			const newInput = {...input};
			newInput.items = JSON.stringify(newInput.items);
			return Basket.create(basketForCreate(newInput))
				.then(insertId => {
					return {
						status: getStatus(StatusCodeEnum.success, 'OK'),
						basket: {
							id: insertId,
							userId: input.userId,
							items: input.items
						}
					};
				})
				.catch(e => ({
					status: getStatus(StatusCodeEnum.serverSideError, e),
					basket: input
				}));
		},

		updateBasket: (_, { input }) => {
			const newInput = {...input};
			newInput.items = JSON.stringify(newInput.items);
			return Basket.update(basketForUpdate(newInput))
				.then(ret => {
					return Basket.getUserIdById(input.basketId).then(userId => {
						return (
							{
								status: getStatus(StatusCodeEnum.success, 'OK'),
								basket: {
									id: input.basketId,
									userId: userId,
									items: input.items
								}
							});
					})
				})
				.catch(e => ({
					status: getStatus(StatusCodeEnum.serverSideError, e),
					basket: input
				}));
		},

		validateBasket: (_, { input }) => {
			// update basket state and userId
			return Basket.validate(input.state, input.userId, input.basketId)
				.then(insertId => {
					return {
						status: getStatus(StatusCodeEnum.success, 'OK'),
						basketId: input.basketId,
						userId: input.userId
					};
				})
				.catch(e => ({
					status: getStatus(StatusCodeEnum.serverSideError, e),
					basketId: input.basketId,
					userId: input.userId
				}));
		}

	}
};

module.exports = resolver;