import {
	SHOW_VIEW,
	HIDE_VIEW
} from "./ticketQuantityActions";

const initialState = {
	isShowing: false
};

const ticketQuantity = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_VIEW:
			return ({ isShowing: true });
		case HIDE_VIEW:
			return ({ isShowing: false});
		default:
			return state;
	}
};

export default ticketQuantity;