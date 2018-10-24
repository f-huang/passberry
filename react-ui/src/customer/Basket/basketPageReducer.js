import {
	EMPTY_TRAVELER_BASKET,
	SWITCH_TRAVELER_BASKET,
	TOGGLE_ITEMS_LAYOUT,
	SWITCH_TRAVELER_IS_SHOWING
} from "./basketActions";

import {TRAVELERS, TRAVELERS_BASKET_CHECKED, BASKET_ITEMS_LAYOUT, BASKET} from "../localStorageKeys";
import EnumToggleItems from "./EnumItemsLayout";

let basket = localStorage.getItem(BASKET);
basket = basket ? JSON.parse(basket) : { items: [] };

let travelers = localStorage.getItem(TRAVELERS);
travelers = travelers ? JSON.parse(travelers) : [];

let travelersBasketChecked = localStorage.getItem(TRAVELERS_BASKET_CHECKED);
travelersBasketChecked = travelersBasketChecked ? JSON.parse(travelersBasketChecked) : {};

const initialState = {
	itemsLayout: localStorage.getItem(BASKET_ITEMS_LAYOUT) || EnumToggleItems.CLASSIC.value,
	travelers: travelersBasketChecked,
	travelerIsShowing: new Array(Object.keys(travelers).length).fill(true),
};


function basketPageReducer(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_ITEMS_LAYOUT:
			localStorage.setItem(BASKET_ITEMS_LAYOUT, Object.values(action.itemsLayout)[0]);
			return Object.assign({}, state, action.itemsLayout);
		case EMPTY_TRAVELER_BASKET:
			localStorage.setItem(TRAVELERS_BASKET_CHECKED, null);
			return {...state, travelers: {}};
		case SWITCH_TRAVELER_BASKET:
			const newTravelers = { ...state.travelers, ...action.pair };
			localStorage.setItem(TRAVELERS_BASKET_CHECKED, JSON.stringify(newTravelers));
			return {...state, travelers:  newTravelers};
		case SWITCH_TRAVELER_IS_SHOWING:
			const tmp = [...state.travelerIsShowing];
			tmp[action.index] = !tmp[action.index];
			return {...state, travelerIsShowing: tmp};
		default:
			return state;
	}
}

const basketPage = {
	basketPage: basketPageReducer
};

export default basketPage;