import { combineReducers } from "redux";

import travelPage from "./customer/Travel/travelReducers";

export const reducer = combineReducers({
	travel: travelPage,
});