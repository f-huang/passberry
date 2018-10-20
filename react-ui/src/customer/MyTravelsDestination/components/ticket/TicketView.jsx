import React from "react";
import styled from "styled-components";
import theme from "../../../../app/theme";
import { connect } from "react-redux";

const Root = styled.div`
	display: flex;
	width: 100%;
	overflow: hidden;
	background-color: ${theme.colorInverse};
	border-radius: 6px;
	margin: 12px 0;
	max-height: 400px;
	
	&:first-child {
		margin-top: 0;
	}
`;

const NumberOfTicketsContainer = styled.div`
	background-color: ${props => props.isUsed ? theme.lightGrey : theme.colorBlue};
	color: ${theme.colorInverse};
	display: flex;
	flex-direction: column;
	text-align: center;
	align-items: center;
	justify-content: center;
	padding: 8px;
`;

const Quantity = styled.span`
	display: block;
	font-size: 36px;
`;

const InfoContainer = styled.div`
	padding: 8px;
	overflow: scroll;
`;

const ActivityName = styled.h3`
	margin: 0;
	font-size: 16px;
	font-weight: 600;
`;

const ActivityAddress = styled.p`
	font-size: 13px;
	margin: 4px 0;
`;

const NoQueuingTIcket = styled.span`
	font-size: 15px;
	font-style: italic;
	font-weight: 300;
`;

const Ticket = ({ ticket, activity, onClick, quantity }) => {
	if (!activity)
		return <div>Loading</div>;
	return (
		<Root onClick={ onClick } isUsed={ ticket.usedTime !== null }>
			<NumberOfTicketsContainer>
				<Quantity>{ quantity }</Quantity>
				{"tickets"}
			</NumberOfTicketsContainer>
			<InfoContainer>
				<ActivityName>{activity.name}</ActivityName>
				<ActivityAddress>
					{activity.address.street}{activity.address.supplement && ' ' + activity.address.supplement }<br/>
					{activity.address.postcode} {activity.address.city}
				</ActivityAddress>
				<NoQueuingTIcket>
					{activity.noQueuing && "Ticket coupe-file"}
				</NoQueuingTIcket>
			</InfoContainer>
		</Root>
	)
};

const mapStateToProps = (state, ownProps) => {
	console.log(state);
	return ({
		activity: (state.activities && state.activities.filter(activity => activity.id === ownProps.ticket.activityId)[0]) || null
	});
};

export default connect(mapStateToProps)(Ticket);