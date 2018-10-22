export const SHOW_VIEW = 'SHOW_VIEW';
export const HIDE_VIEW = 'HIDE_VIEW';
export const SET_ID = 'SET_ID';

export const setId = (id) => ({
	type: SET_ID, id
});

export const showView = (id = null) => ({
	type: SHOW_VIEW, id
});

export const hideView = (id = null) => ({
	type: HIDE_VIEW, id
});