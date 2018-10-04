import {
	EMPTY_TRAVELER_BASKET,
	SWITCH_TRAVELER_BASKET,
	TOGGLE_ITEMS_LAYOUT
} from "./basketActions";

import { TRAVELERS_BASKET_CHECKED } from "../localStorageKeys";
import EnumToggleItems from "./EnumItemsLayout";

const travelersBasketChecked = localStorage.getItem(TRAVELERS_BASKET_CHECKED);

const initialState = {
	itemsLayout: EnumToggleItems.CLASSIC.value,
	travelers: travelersBasketChecked ? JSON.parse(travelersBasketChecked) : {}
};

function basketPageReducer(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_ITEMS_LAYOUT:
			return Object.assign({}, state, action.itemsLayout);
		case EMPTY_TRAVELER_BASKET:
			localStorage.setItem(TRAVELERS_BASKET_CHECKED, null);
			return {...state, travelers: {}};
		case SWITCH_TRAVELER_BASKET:
			const newTravelers = { ...state.travelers, ...action.pair };
			localStorage.setItem(TRAVELERS_BASKET_CHECKED, JSON.stringify(newTravelers));
			return {...state, travelers:  newTravelers};
		default:
			return state;
	}
}

const basketPage = {
	basketPage: basketPageReducer
};

export default basketPage;