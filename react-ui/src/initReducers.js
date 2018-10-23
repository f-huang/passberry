import {
	ACTIVITIES,
} from "./customer/localStorageKeys";

const initialActivities = localStorage.getItem(ACTIVITIES);

const activityReducer = (state = initialActivities, action) => {
	return initialActivities ? JSON.parse(initialActivities) : null;
};

const reducers = {
	activities: activityReducer
};

export default reducers;
