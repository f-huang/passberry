import React from "react";
import styled from "styled-components";

const Container = styled.div`
	color: ${props => props.isUsed ? 'red' : 'default'};
`;

const Ticket = ({ ticket, onClick, quantity }) => {
	return (
		<Container onClick={ onClick } isUsed={ ticket.usedTime !== null }>
			{ quantity } x { ticket.id } @{ ticket.attractionId }
		</Container>
	)
};

export default Ticket;