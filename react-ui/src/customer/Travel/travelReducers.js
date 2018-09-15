import { combineReducers } from "redux";
import {
	SUBMIT,
	SET_DESTINATION,
	SET_NUMBER_OF_TRAVELERS
} from './travelActions';

import {
	DESTINATION,
	N_TRAVELERS
} from "../localStorageKeys";

const destination = localStorage.getItem(DESTINATION);
const nTravelers = localStorage.getItem(N_TRAVELERS);

const initialState = {
	destination: destination ? destination : "",
	nTravelers: nTravelers ? parseInt(nTravelers) : 1
};

const setInput = (key, value) => {
	localStorage.setItem(key, value);
};

const getNewState = (state, action) => Object.assign({}, state, action.pair);

function reducers(state = initialState, action) {
	let key;
	if (action.pair)
		key = Object.keys(action.pair)[0];
	switch (action.type) {
		case SET_NUMBER_OF_TRAVELERS:
			setInput(N_TRAVELERS, action.pair[key]);
			return getNewState(state, action);
		case SET_DESTINATION:
			setInput(DESTINATION, action.pair[key]);
			return getNewState(state, action);
		case SUBMIT:
			return action.form;
		default:
			return state;
	}
}

const travelPage = reducers;

export default travelPage;