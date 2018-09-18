import { combineReducers } from "redux";

import travelPage from "./customer/Travel/travelReducers";
import travelersPage from "./customer/Travelers/travelersReducers";
import destinationOffersPage from "./customer/DestinationOffers/destinationOffersReducers";

export const reducer = combineReducers({
	travel: travelPage,
	travelers: travelersPage,
	destinationOffers: destinationOffersPage
});