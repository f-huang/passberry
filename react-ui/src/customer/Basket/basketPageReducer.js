import {
	TOGGLE_ITEMS_LAYOUT
} from "./basketActions";
import EnumToggleItems from "./EnumItemsLayout";

const initialState = {
	itemsLayout: EnumToggleItems.CLASSIC.value
};

function basketPageReducer(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_ITEMS_LAYOUT:
			return Object.assign({}, state, action.itemsLayout);
		default:
			return state;
	}
}

const basketPage = {
	basketPage: basketPageReducer
};

export default basketPage;