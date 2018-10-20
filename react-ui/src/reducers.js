import { combineReducers } from "redux";

import travelPageReducer from "./customer/Travel/travelReducers";
import basketReducer from "./customer/Basket/basketReducers";
import basketPageReducer from "./customer/Basket/basketPageReducer";
import ticketQuantity from "./customer/TicketQuantity/ticketQuantityReducer";
import scanReducer from "./partner/scan/scanReducers";
import attractionCreateReducer from "./admin/activity/create/activityCreateReducers";
import attractionReducer from "./customer/Activity/activityReducers";

export const reducer = combineReducers({
	travelDetails: travelPageReducer,
	basket: basketReducer.basket,
	basketPage: basketPageReducer.basketPage,
	scan: scanReducer.scan,
	createActivity: attractionCreateReducer,
	ticketQuantity: ticketQuantity,
	attractionPage: attractionReducer
});