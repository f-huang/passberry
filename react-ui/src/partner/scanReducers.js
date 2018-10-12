import { SET_TRAVELER } from "./scanActions";
import {PARTNER_SCANNED} from "../customer/localStorageKeys";

const traveler = localStorage.getItem(PARTNER_SCANNED);
const initialState = {
	traveler: (traveler !== undefined && traveler !== null ? JSON.parse(traveler).traveler : null)
};

function scanReducer(state = initialState, action) {
	switch (action.type) {
		case SET_TRAVELER:
			const tmp = action.traveler;
			console.log("saving : " , tmp);
			localStorage.setItem(PARTNER_SCANNED, JSON.stringify(tmp));
			return Object.assign({}, state, action.traveler);
		default:
			return state;
	}
}

const reducer = {
	scan: scanReducer
};

export default reducer;