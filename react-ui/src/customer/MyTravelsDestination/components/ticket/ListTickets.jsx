import React from "react";
import Ticket from "./TicketView";

const ListTickets = ({ tickets }) => {
	if (tickets.length <= 0 )
		return "";

	const list = tickets.reduce((memo, current) => {
		if (!memo.find(ticket => ticket.attractionId === current.attractionId)) {
			current.quantity = tickets.filter(listItem => listItem.attractionId === current.attractionId).length;
			memo.push(current);
		}
		return memo;
	}, []);

	return list.map(item => {
		return <Ticket
			key={ `${item.id}-${item.attractionId}` }
			quantity={ item.quantity }
			ticket={ item }
			onClick={ e => { e.preventDefault(); console.log('clicked on ticket') }}
		/>;
	})
};

export default ListTickets;