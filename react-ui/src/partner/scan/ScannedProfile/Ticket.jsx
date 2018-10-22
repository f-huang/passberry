import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import theme from "../../../app/theme";
import EnumScanState from "../EnumScanState";
import getScanState from "./getScanState";

const Root = styled.div`
	background-color: ${theme.colorInverse};
	border-radius: 6px;
	margin-top: 24px;
	padding: 12px;
	width: 100%;
`;

const ActivityName = styled.div`
	font-weight: bold;
	font-size: 13px;
`;

const State = styled.div`
	margin-top: 24px;
	font-size: 20px;
	font-weight: bold;
`;

const TicketError = styled(State)`
	color: ${theme.colorRed};
`;

const TicketSuccess = styled(State)`
	color: ${theme.colorDarkGreen};
`;

const Ticket = ({ ticket, activity}) => {
	const state = getScanState(ticket);
	return (
		<Root>
			<ActivityName>{ activity.name }</ActivityName>
			{
				state === EnumScanState.SUCCESS ?
					<TicketSuccess>{`Ticket Valide`}</TicketSuccess> :
					<TicketError>{`Ticket ${state.display}`}</TicketError>
			}

		</Root>
	)
};

const mapStateToProps = (state, ownProps) => {
	return ({
		ticket: state.scan.ticket,
		activity: state.activities.filter(activity => parseInt(activity.id, 10) === 1)[0]
	});
};

export default connect(mapStateToProps)(Ticket);