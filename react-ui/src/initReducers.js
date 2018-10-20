import {
	INIT_ACTIVITIES
} from "./initActions";
import { ACTIVITIES } from "./customer/localStorageKeys";

const initialActivities = JSON.parse(localStorage.getItem(ACTIVITIES)) || [];

const activityReducer = (state = initialActivities, action) => {
	if (action.type === INIT_ACTIVITIES) {
		localStorage.setItem(ACTIVITIES, JSON.stringify(action.activities));
		return action.activities;
	}
	return state;
};

const reducers = {
	activities: activityReducer
};

export default reducers;
