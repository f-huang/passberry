import {
	// FILTER_ATTRACTIONS,
	// SEE_ATTRACTION,
	// SEE_MORE,
	ADD_TO_BASKET,
	REMOVE_FROM_BASKET
} from "./destinationOffersActions";
import { BASKET } from "../localStorageKeys";
import { createApolloFetch } from 'apollo-fetch';
import moment from "moment";

let basket = localStorage.getItem(BASKET);
basket = basket ? JSON.parse(basket) : {};

const fetch = createApolloFetch();
// let attractions = apiCall(Attra)

//ADD TO BASKET - REMOVE_FROM_BASKET:
//basket = [attractions] = [{attractionId:, quantity:, travelerId:,}, ...]
function attractionsReducer(state = [], action) {
	return fetch({
		query: `query getAllAttractions($limit: Int) {
		    getAllAttractions(limit: $limit) {
		      id
		      name
		      type
		      link
		      description
		    }
		  }`,
	}).then(res => {
		console.log(res.data);
		return res.data.getAllAttractions;
	}).catch(e => state)
}

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
		default:
			return state;
	}
}


const destinationOffersPage = {
	basket: basketReducer,
	attractions: attractionsReducer
};

export default destinationOffersPage;