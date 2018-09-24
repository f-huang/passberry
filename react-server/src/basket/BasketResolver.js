const Basket = require('./BasketModel');

const { getStatus, StatusCodeEnum } = require("../status");

const basketForCreate = (input) => ({
	"init_time": input.initTime,
	"last_update_time": input.lastUpdateTime,
	...(input.userId ? {"user_id": input.userId} : {}),
	"choices": input.choices
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
			console.log("Creating basket :", input);
			const newInput = {...input};
			newInput.choices = JSON.stringify(newInput.choices);
			return Basket.create(basketForCreate(newInput))
				.then(insertId => {
					return {
						status: getStatus(StatusCodeEnum.success, 'OK'),
						basket: {
							id: insertId,
							userId: input.userId,
							choices: input.choices
						}
					};
				})
				.catch(e => ({
					status: getStatus(StatusCodeEnum.serverSideError, e),
					basket: input
				}));
		},

		updateBasket: (_, { input }) => {
			console.log("Updating basket :", input);
			const newInput = {...input};
			newInput.choices = JSON.stringify(newInput.choices);
			return Basket.update(basketForUpdate(newInput))
				.then(ret => {
					return Basket.getUserIdById(input.basketId).then(userId => {
						console.log(
							"userId : ", userId
						);
						return (
							{
								status: getStatus(StatusCodeEnum.success, 'OK'),
								basket: {
									id: input.basketId,
									userId: userId,
									choices: input.choices
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
			console.log("Updating basket :", input);
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