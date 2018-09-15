export const SUBMIT = 'SUBMIT';
export const SET_DESTINATION = 'SET_DESTINATION';
export const SET_NUMBER_OF_TRAVELERS = 'SET_NUMBER_OF_TRAVELERS';


export const submit = (form) => ({type: SUBMIT, form});
export const setDestination = (pair) => ({type: SET_DESTINATION, pair});
export const setNumberOfTravelers = (pair) => ({type: SET_NUMBER_OF_TRAVELERS, pair});
