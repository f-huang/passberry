import {
	SUBMIT,
	SET_DESTINATION,
	EDIT_DATES,
	EDIT_START_DATE,
	EDIT_END_DATE,
	ADD_TRAVELER,
	EDIT_TRAVELER,
	REMOVE_TRAVELER
} from './travelActions';

import {
	DESTINATION, END_DATE,
	N_TRAVELERS, START_DATE, TRAVELERS
} from "../localStorageKeys";

import {combineReducers} from "redux";
import moment from "moment";

const destination = localStorage.getItem(DESTINATION);
let nTravelers = localStorage.getItem(N_TRAVELERS);
nTravelers = nTravelers ? parseInt(nTravelers, 10) : 1;
let travelers = localStorage.getItem(TRAVELERS);
travelers = travelers ? JSON.parse(travelers) : [""];
const startDate = localStorage.getItem(START_DATE);
const endDate = localStorage.getItem(END_DATE);

const travelDates = {
	startDate: startDate ? moment(JSON.parse(startDate)) : null,
	endDate: endDate ? moment(JSON.parse(endDate)) : null
};


function travelDatesReducer(state = travelDates, action) {
	switch (action.type) {
		case EDIT_DATES:
			localStorage.setItem(START_DATE, JSON.stringify(action.dates.startDate));
			localStorage.setItem(END_DATE, JSON.stringify(action.dates.endDate));
			return action.dates;

		default:
			return state;
	}
}

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
			localStorage.setItem(DESTINATION, action.pair[key]);
			return action.pair[key];
		default:
			return state;
	}
}

const travelPage = combineReducers({
	destination: destinationReducer,
	travelers: travelerReducers,
	travelDates: travelDatesReducer
});

export default travelPage;