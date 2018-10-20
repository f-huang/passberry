import React from "react";
import Ticket from "./TicketView";

const ListTickets = ({ tickets }) => {
	if (tickets.length <= 0 )
		return "";

	const list = tickets.reduce((memo, current) => {
		if (!memo.find(ticket => ticket.activityId === current.activityId)) {
			current.quantity = tickets.filter(listItem => listItem.activityId === current.activityId).length;
			memo.push(current);
		}
		return memo;
	}, []);

	return list.map(item => {
		return <Ticket
			key={ `${item.id}-${item.activityId}` }
			quantity={ item.quantity }
			ticket={ item }
			onClick={ e => { e.preventDefault(); console.log('clicked on ticket') }}
		/>;
	})
};

export default ListTickets;