import { combineReducers } from "redux";

import travelPage from "./customer/Travel/travelReducers";
import travelersPage from "./customer/Travelers/travelersReducers";

export const reducer = combineReducers({
	travel: travelPage,
	travelers: travelersPage
});