import {
	SET_ADDRESS_INPUT,
	SET_IMAGES,
	SET_INPUT, SET_PRICE_INPUT
} from "./activityCreateActions";


const initialState = {
	images: {},
	name: "",
	price: {
		adult: 0.0,
		child: 0.0,
		student: 0.0,
		maxAgeForChild: 0,
	},
	type: "",
	description: "",
	link: "",
	address: {
		street: "",
		supplement: "",
		city: "",
		postcode: "",
		countryCode: ""
	},
};

function price(state = initialState.price, priceInput) {
	return { ...state.price, ...priceInput }
}


function address(state = initialState.address, addressInput) {
	return { ...state.address, ...addressInput }
}

function attractionReducer(state = initialState, action) {
	switch (action.type) {
		case SET_INPUT:
			return {...state, ...action.input};
		case SET_PRICE_INPUT:
			return {...state, price: price(state, action.priceInput)};
		case SET_ADDRESS_INPUT:
			return {...state, address: address(state, action.addressInput)};
		case SET_IMAGES:
			console.log("images = ", action.images);
			return {...state, ...action.images};
		default:
			return state;
	}
}


const reducer = attractionReducer;
export default reducer;