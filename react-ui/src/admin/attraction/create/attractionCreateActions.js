export const SET_INPUT = 'SET_INPUT';
export const SET_PRICE_INPUT = 'SET_PRICE_INPUT';
export const SET_ADDRESS_INPUT = 'SET_ADDRESS_INPUT';
export const SET_IMAGES = 'SET_IMAGES';

export const setInput = (input) => ({
	type: SET_INPUT, input
});

export const setPriceInput = (priceInput) => ({
	type: SET_PRICE_INPUT, priceInput
});

export const setAddressInput = (addressInput) => ({
	type: SET_ADDRESS_INPUT, addressInput
});

export const setImages = (images) => ({
	type: SET_IMAGES, images
});