import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";

import travelPage from "./customer/Travel/travelReducers";
import destinationOffersPage from "./customer/DestinationOffers/destinationOffersReducers";

export const reducer = combineReducers({
	travelDetails: travelPage,
	basket: destinationOffersPage.basket
});