const Ticket = require('./TicketModel');
const Pass = require('../pass/PassModel');

const resolver = {
	Query: {
		getTicketByQrAndActivityId: (_, { qr, attractionId }) => {
			let ticket = null;
			return Pass.getByQr(qr).then(passes => {
				passes.forEach(pass => {
					const index = pass.tickets.findIndex(ticket => parseInt(ticket.attractionId, 10) === parseInt(attractionId, 10));
					if (index !== -1)
						ticket = pass.tickets[index];
				});
				return ticket;
			}).catch(e => { console.error(e); return ticket});
		},
		getTicketByTravelerIdAndActivityId: (_, { travelerId, attractionId }) => {
			let ticket = null;
			return Pass.getByTravelerId(travelerId).then(passes => {
				passes.forEach(pass => {
					const index = pass.tickets.findIndex(ticket => parseInt(ticket.attractionId, 10) === parseInt(attractionId, 10));
					if (index !== -1)
						ticket = pass.tickets[index];
				});
				return ticket;
			}).catch(e => { console.error(e); return ticket});
		}
	}
};

module.exports = resolver;