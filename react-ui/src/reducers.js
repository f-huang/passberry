import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";

import travelPage from "./customer/Travel/travelReducers";
import destinationOffersPage from "./customer/DestinationOffers/destinationOffersReducers";

const travelReducer = reduceReducers({
	travelPage, destinationOffersPage
});


export const reducer = combineReducers({
	travelDetails: travelPage
});