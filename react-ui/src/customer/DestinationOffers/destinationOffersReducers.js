import {
	FILTER_ATTRACTIONS,
	SEE_ATTRACTION,
	SEE_MORE,
	ADD_TO_BASKET,
	REMOVE_FROM_BASKET
} from "./destinationOffersActions";
import {BASKET, N_TRAVELERS, TRAVELERS} from "../localStorageKeys";


const basket = localStorage.getItem(BASKET);
const nTravelers = localStorage.getItem(N_TRAVELERS);
const travelers = localStorage.getItem(TRAVELERS);
// const startDate = localStorage.getItem(START_DATE);
// const endDate = localStorage.getItem(END_DATE);

const initialState = {
	basket: basket ? JSON.parse(basket) : [],
	destination: {id: 0, name: ''},
	nTravelers: nTravelers,
	travelers: travelers ? JSON.parse(travelers) : []
};

//ADD TO BASKET - REMOVE_FROM_BASKET:
//basket = [attractions] = [{attractionId:, quantity:, travelerId:,}, ...]


function basketHandler(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_BASKET:
			const tmp = state.basket.concat(action.attractions);
			return Object.assign({}, state,
				{ basket: tmp }
			);
		case REMOVE_FROM_BASKET:
			const index = state.basket.findIndex(item =>
				item.attractionId === action.item.id && item.travelerId === action.item.travelerId);
			if (index >= 0 && index < state.basket.length) {
				let basket = state.basket;
				if (basket[index].quantity > 0)
					basket[index].quantity--;
				return Object.assign({}, state,
					{ basket: basket }
				);

			}
			else
				return state;
		default:
			return state;
	}
}

function destinationOffersPage(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_BASKET:
			return basketHandler(state, action);
		case REMOVE_FROM_BASKET:
			return basketHandler(state, action);
		default:
			return state;
	}
}

export default destinationOffersPage;