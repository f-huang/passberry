import {
	SUBMIT,
	ADD_TRAVELER,
	EDIT_TRAVELER,
	REMOVE_TRAVELER
} from './travelersActions';

import {
	N_TRAVELERS,
	TRAVELERS
} from "../localStorageKeys";


const nTravelers = localStorage.getItem(N_TRAVELERS);
const travelers = localStorage.getItem(TRAVELERS);
const initialState = {
	nTravelers: nTravelers ? parseInt(nTravelers) : 1,
	travelers: travelers ? JSON.parse(travelers) : [],
};

function updateNumberOfTravelers(number) {
	localStorage.setItem(N_TRAVELERS, (number).toString());
}

function reducers(state = initialState, action) {
	switch (action.type) {
		case ADD_TRAVELER:
			updateNumberOfTravelers(state.nTravelers + 1);
			return Object.assign({}, state, {
				nTravelers: state.nTravelers + 1
			});


		case EDIT_TRAVELER:
			const travelers = state.travelers;
			travelers[action.traveler.index] = {name: action.traveler.name};
			localStorage.setItem(TRAVELERS, JSON.stringify(travelers));
			return { ...state, travelers };

		case REMOVE_TRAVELER:
			if (state.nTravelers > 1) {
				let tmp;
				updateNumberOfTravelers(state.nTravelers - 1);
				if (state.travelers[action.index]) {
					tmp = state.travelers;
					tmp.splice(action.index, 1);
					localStorage.setItem(TRAVELERS, JSON.stringify(tmp));
				}
				return Object.assign({}, state, {
					travelers: tmp || state.travelers,
					nTravelers: state.nTravelers - 1
				});
			}
			return state;
		case SUBMIT:
			return action.travelers;
		default:
			return state;
	}
}

const travelersPage = reducers;

export default travelersPage;