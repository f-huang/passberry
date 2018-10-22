import {
	INIT_ACTIVITIES, UPDATE_LAST_TIME_FETCHED
} from "./initActions";
import {
	ACTIVITIES, LAST_TIME_FETCHED
} from "./customer/localStorageKeys";

const initialActivities = JSON.parse(localStorage.getItem(ACTIVITIES)) || [];
const initialTime = JSON.parse(localStorage.getItem(LAST_TIME_FETCHED)) || null;

const activityReducer = (state = initialActivities, action) => {
	if (action.type === INIT_ACTIVITIES) {
		localStorage.setItem(ACTIVITIES, JSON.stringify(action.activities));
		return action.activities;
	}
	return state;
};

const lastTimeFetchedReducer = (state = initialTime, action) => {
	if (action.type === UPDATE_LAST_TIME_FETCHED)
		localStorage.setItem(LAST_TIME_FETCHED, JSON.stringify(action.lastTime));
	return state;
};

const reducers = {
	activities: activityReducer,
	lastTimeFetched: lastTimeFetchedReducer
};

export default reducers;
