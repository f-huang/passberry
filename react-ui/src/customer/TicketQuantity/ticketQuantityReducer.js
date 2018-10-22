import {
	SHOW_VIEW,
	HIDE_VIEW,
	SET_ID
} from "./ticketQuantityActions";

const initialState = {
	isShowing: false,
	ids: {}
};

const ticketQuantity = (state = initialState, action) => {
	switch (action.type) {
		case SET_ID:
			state.ids[action.id] = false;
			return state;
		case SHOW_VIEW:
			if (action.id) {
				state.ids[action.id] = true;
				return {...state};
			}
			return ({ isShowing: true });
		case HIDE_VIEW:
			if (action.id) {
				state.ids[action.id] = false;
				return {...state};
			}
			return ({ isShowing: false});
		default:
			return state;
	}
};

export default ticketQuantity;