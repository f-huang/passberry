export const ADD_TO_BASKET = 'ADD_TO_BASKET';
export const EMPTY_BASKET = 'EMPTY_BASKET';
export const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET';
export const REINITIALIZE_BASKET = 'REINITIALIZE_BASKET';
export const SET_BASKET_ID = 'SET_BASKET_ID';
export const TOGGLE_ITEMS_LAYOUT = 'TOGGLE_ITEMS_LAYOUT';
export const UPDATE_TRAVELER_IDS = 'UPDATE_TRAVELER_IDS';
export const SWITCH_TRAVELER_BASKET = 'SWITCH_TRAVELER_BASKET';
export const EMPTY_TRAVELER_BASKET = 'EMPTY_TRAVELER_BASKET';
export const SWITCH_TRAVELER_IS_SHOWING = 'SWITCH_TRAVELER_IS_SHOWING';

export const addToBasket = (item) => ({
	type: ADD_TO_BASKET, item
});

export const removeFromBasket = (item) => ({
	type: REMOVE_FROM_BASKET, item
});

export const reinitializeBasket = (basket) => ({
	type: REINITIALIZE_BASKET, basket
});

export const setBasketId = (id) => ({
	type: SET_BASKET_ID, id
});

export const updateTravelerIds = (ids) => ({
	type: UPDATE_TRAVELER_IDS, ids
});

export const emptyBasket = () => ({
	type: EMPTY_BASKET
});

export const toggleItemsLayout = (itemsLayout) => ({
	type: TOGGLE_ITEMS_LAYOUT, itemsLayout
});

export const switchTravelerBasket = (pair) => ({
	type: SWITCH_TRAVELER_BASKET, pair
});

export const emptyTravelerBasket = () => ({
	type: EMPTY_TRAVELER_BASKET
});

export const switchTravelerIsShowing = (index) => ({
	type: SWITCH_TRAVELER_IS_SHOWING, index
});