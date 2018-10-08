import {
	// FILTER_ATTRACTIONS,
	// SEE_ATTRACTION,
	// SEE_MORE,
	ADD_TO_BASKET, EMPTY_BASKET,
	REMOVE_FROM_BASKET, SET_BASKET_ID
} from "./basketActions";
import { BASKET } from "../localStorageKeys";

let basket = localStorage.getItem(BASKET);
basket = basket ? JSON.parse(basket) : { items: [] };

function basketReducer(state = basket, action) {
	let newBasket;
	switch (action.type) {
		case ADD_TO_BASKET:
			const lastUpdateTime = Date.now();
			const initTime = state.length > 0 ? state.initTime : lastUpdateTime;
			const indexItem = state.items ? state.items.findIndex(basketItem =>
				basketItem.travelerId === action.item.travelerId && basketItem.product.id === action.item.product.id
			) : -1;
			let newItems;
			if (state.items === undefined || !state.items || !state.items.length)
				newItems = [action.item];
			else if (indexItem !== -1) {
				newItems = state.items;
				newItems[indexItem].quantity = state.items[indexItem].quantity + 1;
			}
			else {
				newItems = [...state.items, action.item];
			}
			newBasket = {
				lastUpdateTime,
				initTime,
				items: newItems
			};
			localStorage.setItem(BASKET, JSON.stringify(newBasket));
			return newBasket;

		case REMOVE_FROM_BASKET:
			const index = state.items.findIndex(basketItem =>
				basketItem.travelerId === action.item.travelerId && basketItem.product.id === action.item.product.id);
			if (index >= 0 && index < state.items.length) {
				const newItems = state.items;
				if (newItems[index].quantity > 0)
					newItems[index].quantity = newItems[index].quantity - 1;
				newBasket = {...state, items: newItems};
				localStorage.setItem(BASKET, JSON.stringify(newBasket));
				return newBasket;
			}
			else
				return state;

		case SET_BASKET_ID:
			const basketWithId = Object.assign({}, state, action.id);
			console.log("setting basket Id: ", basketWithId);
			localStorage.setItem(BASKET, JSON.stringify(basketWithId));
			return basketWithId;

		case EMPTY_BASKET:
			localStorage.removeItem(BASKET);
			return {};

		default:
			return state;

	}
}

const destinationOffersPage = {
	basket: basketReducer,
};

export default destinationOffersPage;