export const FILTER_ATTRACTIONS = 'FILTER_ATTRACTIONS';
export const SEE_ATTRACTION = 'SEE_ATTRACTION';
export const ADD_TO_BASKET = 'ADD_TO_BASKET';
export const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET';
export const SEE_MORE = 'SEE_MORE';

export const filterAttractions = (attractionName) => ({
	type: FILTER_ATTRACTIONS, attractionName
});

export const seeAttraction = (attractionId) => ({
	type: SEE_ATTRACTION, attractionId
});

export const addToBasket = (item) => ({
	type: ADD_TO_BASKET, item
});

export const removeFromBasket = (item) => ({
	type: REMOVE_FROM_BASKET, item
});

export const seeMore = (attractionType) => ({
	type: SEE_MORE, attractionType
});