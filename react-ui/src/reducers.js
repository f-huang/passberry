import { combineReducers } from "redux";

import travelPage from "./customer/Travel/travelReducers";
import destinationOffersPage from "./customer/Basket/basketReducers";

export const reducer = combineReducers({
	travelDetails: travelPage,
	basket: destinationOffersPage.basket
});