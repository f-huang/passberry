import { combineReducers } from "redux";

import travelPageReducer from "./customer/Travel/travelReducers";
import basketReducer from "./customer/Basket/basketReducers";
import basketPageReducer from "./customer/Basket/basketPageReducer";

export const reducer = combineReducers({
	travelDetails: travelPageReducer,
	basket: basketReducer.basket,
	basketPage: basketPageReducer.basketPage
});