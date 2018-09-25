export const SUBMIT = 'SUBMIT';
export const SET_DESTINATION = 'SET_DESTINATION';
export const ADD_TRAVELER =  'ADD_TRAVELER';
export const EDIT_TRAVELER = 'EDIT_TRAVELER';
export const REMOVE_TRAVELER = 'REMOVE_TRAVELER';

export const submit = (form) => ({type: SUBMIT, form});
export const setDestination = (pair) => ({type: SET_DESTINATION, pair});
export const addTraveler = () => ({type: ADD_TRAVELER});
export const editTraveler = traveler => ({type: EDIT_TRAVELER, traveler});
export const removeTraveler = index => ({type: REMOVE_TRAVELER, index});