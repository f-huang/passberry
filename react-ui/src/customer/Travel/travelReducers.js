import {
	SUBMIT,
	SET_DESTINATION,
	ADD_TRAVELER,
	EDIT_TRAVELER,
	REMOVE_TRAVELER
} from './travelActions';

import {
	DESTINATION,
	N_TRAVELERS, TRAVELERS
} from "../localStorageKeys";

import {combineReducers} from "redux";

const destination = localStorage.getItem(DESTINATION);
let nTravelers = localStorage.getItem(N_TRAVELERS);
nTravelers = nTravelers ? parseInt(nTravelers, 10) : 1;
let travelers = localStorage.getItem(TRAVELERS);
travelers = travelers ? JSON.parse(travelers) : [""];

const setInput = (key, value) => {
	localStorage.setItem(key, value);
};


function travelerReducers (state = travelers, action) {
	switch (action.type) {
		case ADD_TRAVELER:
			const newTravelers = [...state, ""];
			localStorage.setItem(TRAVELERS, JSON.stringify(newTravelers));
			return newTravelers;

		case EDIT_TRAVELER:
			const travelers = state.slice(0);
			travelers[action.traveler.index] = {name: action.traveler.name};
			localStorage.setItem(TRAVELERS, JSON.stringify(travelers));
			return travelers;

		case REMOVE_TRAVELER:
			if (state.length > 1) {
				let tmp;
				if ((state[action.index] !== null && state[action.index] !== undefined) || action.index === undefined) {
					tmp = state.slice(0);
					tmp.splice(action.index !== undefined ? action.index : -1 , 1);
					console.log(tmp);
					localStorage.setItem(TRAVELERS, JSON.stringify(tmp));
				}
				return tmp || state;
			}
			return state;
		default:
			return state;
	}
}

function destinationReducer(state = destination, action) {
	let key;
	if (action.pair)
		key = Object.keys(action.pair)[0];
	switch (action.type) {
		case SET_DESTINATION:
			console.log("set", action.pair);
			setInput(DESTINATION, action.pair[key]);
			return action.pair[key];
		default:
			return state;
	}
}

const travelPage = combineReducers({
	destination: destinationReducer,
	travelers: travelerReducers
});

export default travelPage;