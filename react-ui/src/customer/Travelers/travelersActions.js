export const ADD_TRAVELER =  'ADD_TRAVELER';
export const EDIT_TRAVELER = 'EDIT_TRAVELER';
export const REMOVE_TRAVELER = 'REMOVE_TRAVELER';
export const SUBMIT = 'SUBMIT';

export const addTraveler = () => ({
	type: ADD_TRAVELER
});

export const editTraveler = traveler => ({
	type: EDIT_TRAVELER, traveler
});

export const removeTraveler = index => ({
	type: REMOVE_TRAVELER, index
});

export const submit = travelers => ({
	type: SUBMIT, travelers
});