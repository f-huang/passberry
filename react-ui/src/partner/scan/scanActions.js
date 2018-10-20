export const SET_TRAVELER = 'SET_TRAVELER';
export const SET_TICKET = 'SET_TICKET';

export const setTraveler = (traveler) => ({
	type: SET_TRAVELER, traveler
});

export const setTicket = (ticket) => ({
	type: SET_TICKET, ticket
});