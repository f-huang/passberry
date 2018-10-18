import { combineReducers } from "redux";

import travelPageReducer from "./customer/Travel/travelReducers";
import basketReducer from "./customer/Basket/basketReducers";
import basketPageReducer from "./customer/Basket/basketPageReducer";
import ticketQuantity from "./customer/TicketQuantity/ticketQuantityReducer";
import scanReducer from "./partner/scan/scanReducers";
import attractionCreateReducer from "./admin/attraction/create/attractionCreateReducers";
import attractionReducer from "./customer/Attraction/attractionReducers";

export const reducer = combineReducers({
	travelDetails: travelPageReducer,
	basket: basketReducer.basket,
	basketPage: basketPageReducer.basketPage,
	scan: scanReducer.scan,
	createAttraction: attractionCreateReducer,
	ticketQuantity: ticketQuantity,
	attractionPage: attractionReducer
});