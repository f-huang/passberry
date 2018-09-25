import {
	FILTER_ATTRACTIONS,
	SEE_ATTRACTION,
	SEE_MORE,
	ADD_TO_BASKET,
	REMOVE_FROM_BASKET
} from "./destinationOffersActions";
import { combineReducers } from "redux";
import {BASKET, TRAVELERS} from "../localStorageKeys";
import apiCall from "../../Api";


let basket = localStorage.getItem(BASKET);
basket = basket ? JSON.parse(basket) : [];
let travelers = localStorage.getItem(TRAVELERS);
travelers = travelers ? JSON.parse(travelers) : [];

// let attractions = apiCall(Attra)

//ADD TO BASKET - REMOVE_FROM_BASKET:
//basket = [attractions] = [{attractionId:, quantity:, travelerId:,}, ...]


function basketReducer(state = basket, action) {
	let newBasket;
	switch (action.type) {
		case ADD_TO_BASKET:
			newBasket = [...state, action.item];
			localStorage.setItem(BASKET, JSON.stringify(newBasket));
			return newBasket;
		case REMOVE_FROM_BASKET:
			const index = state.findIndex(item =>
				item.attractionId === action.item.id && item.travelerId === action.item.travelerId);
			if (index >= 0 && index < state.length) {
				newBasket = state.slide(0);
				if (newBasket[index].quantity > 0)
					newBasket[index].quantity--;
				return newBasket;
			}
			else
				return state;
		default:
			return state;
	}
}

function attractions(state = [], action) {

}

const destinationOffersPage = {
	basket: basketReducer
};

export default destinationOffersPage;