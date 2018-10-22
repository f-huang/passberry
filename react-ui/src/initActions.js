export const INIT_ACTIVITIES = 'INIT_ACTIVITIES';
export const UPDATE_LAST_TIME_FETCHED = 'UPDATE_LAST_TIME_FETCHED';

export const initActivities = (activities) => ({
	type: INIT_ACTIVITIES, activities
});

export const updateLastTimeFetched = (lastTime) => ({
	type: UPDATE_LAST_TIME_FETCHED, lastTime
});