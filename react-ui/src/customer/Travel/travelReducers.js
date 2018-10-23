import {
	SET_DESTINATION,
	EDIT_DATES,
	ADD_TRAVELER,
	EDIT_TRAVELER,
	REMOVE_TRAVELER
} from './travelActions';

import {
	DESTINATION, END_DATE, START_DATE, TRAVELERS
} from "../localStorageKeys";

import {combineReducers} from "redux";
import moment from "moment";

const destination = localStorage.getItem(DESTINATION);
let travelers = localStorage.getItem(TRAVELERS);
travelers = travelers ? JSON.parse(travelers) : [{firstName: "", id: 1, isNew: true }];
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
			const newTravelers = [...state, {firstName: "", id: state[state.length - 1].id + 1, isNew: true}];
			localStorage.setItem(TRAVELERS, JSON.stringify(newTravelers));
			return newTravelers;

		case EDIT_TRAVELER:
			const travelers = state.slice(0);
			travelers[action.traveler.index] = {
				id: action.traveler.id ? action.traveler.id : state[action.traveler.index].id,
				firstName: action.traveler.firstName !== undefined && action.traveler.firstName !== null ? action.traveler.firstName.trim() : state[action.traveler.index].firstName,
				isNew: action.traveler.firstName !== undefined && action.traveler.firstName !== null ? true : (action.traveler.isNew !== undefined ? action.traveler.isNew : state[action.traveler.index].isNew),
			};
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