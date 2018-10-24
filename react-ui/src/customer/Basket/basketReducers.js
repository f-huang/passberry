import {
	ADD_TO_BASKET, EMPTY_BASKET, REINITIALIZE_BASKET,
	REMOVE_FROM_BASKET, SET_BASKET_ID, UPDATE_TRAVELER_IDS
} from "./basketActions";
import { BASKET } from "../localStorageKeys";

let basket = localStorage.getItem(BASKET);
basket = basket ? JSON.parse(basket) : { items: [] };

function basketReducer(state = basket, action) {
	let newBasket;
	switch (action.type) {
		case ADD_TO_BASKET:
			const lastUpdateTime = Date.now();
			const initTime = state.length > 0 && state.initTime ? state.initTime : lastUpdateTime;
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

		case REINITIALIZE_BASKET:
			console.log("reinit basket", action.basket);
			localStorage.removeItem(BASKET);
			localStorage.setItem(BASKET, JSON.stringify(action.basket));
			return { ...action.basket };

		case UPDATE_TRAVELER_IDS:
			let items = state.items;
			action.ids.map(id => {
				let index = state.items.findIndex(item => parseInt(item.travelerId, 10) === parseInt(id.old, 10));
				do {
					if (index !== -1)
						items[index].travelerId = id.new;
					index = state.items.findIndex(item => parseInt(item.travelerId, 10) === parseInt(id.old, 10));
				} while (index !== -1)
			});
			localStorage.setItem(BASKET, JSON.stringify({...state, items}));
			return {...state, items};

		case SET_BASKET_ID:
			const basketWithId = Object.assign({}, state, action.id);
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