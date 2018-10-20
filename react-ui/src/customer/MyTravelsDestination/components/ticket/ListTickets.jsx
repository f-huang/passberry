import React from "react";
import styled from "styled-components";
import Ticket from "./TicketView";

const Root = styled.div`
	width: 100%;
	min-height: 100%;
	padding: 24px;
`;


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

	return (
		<Root>
			{list.map(item => {
				return <Ticket
					key={ `${item.id}-${item.activityId}` }
					quantity={ item.quantity }
					ticket={ item }
					onClick={ e => { e.preventDefault(); console.log('clicked on ticket') }}
				/>;
			})}
		</Root>
	);
};

export default ListTickets;