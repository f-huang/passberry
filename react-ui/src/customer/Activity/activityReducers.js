import {
	SHOW_MORE_DESCRIPTION,
	SWITCH_DETAILS_ARE_SHOWING
} from "./activityActions";

const initialState = {
	detailsAreShowing: false,
	showMoreDescription: false
};

const ActivityReducer = (state = initialState, action) => {
	switch(action.type) {
		case SWITCH_DETAILS_ARE_SHOWING:
			const value = !state.detailsAreShowing;
			return {...state, detailsAreShowing: value};
		case SHOW_MORE_DESCRIPTION:
			return {...state, showMoreDescription: true};
		default:
			return state;
	}
};

export default ActivityReducer;