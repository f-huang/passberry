import { SET_TRAVELER, SET_TICKET } from "./scanActions";
import { PARTNER_SCANNED } from "../../customer/localStorageKeys";

const traveler = localStorage.getItem(PARTNER_SCANNED);
const initialState = {
	traveler: (traveler !== undefined && traveler !== null ? JSON.parse(traveler).traveler : null),
	ticket: null
};

function scanReducer(state = initialState, action) {
	switch (action.type) {
		case SET_TRAVELER:
			const tmp = action.traveler;
			console.log("saving : " , tmp);
			localStorage.setItem(PARTNER_SCANNED, JSON.stringify(tmp));
			return Object.assign({}, state, action.traveler);
		case SET_TICKET:
			return Object.assign({}, state, action.ticket);
		default:
			return state;
	}
}

const reducer = {
	scan: scanReducer
};

export default reducer;