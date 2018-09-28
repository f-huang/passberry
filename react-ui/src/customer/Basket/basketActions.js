export const ADD_TO_BASKET = 'ADD_TO_BASKET';
export const EMPTY_BASKET = 'EMPTY_BASKET';
export const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET';
export const SET_BASKET_ID = 'SET_BASKET_ID';

export const addToBasket = (item) => ({
	type: ADD_TO_BASKET, item
});

export const removeFromBasket = (item) => ({
	type: REMOVE_FROM_BASKET, item
});

export const setBasketId = (id) => ({
	type: SET_BASKET_ID, id
});

export const emptyBasket = () => ({
	type: EMPTY_BASKET
});
