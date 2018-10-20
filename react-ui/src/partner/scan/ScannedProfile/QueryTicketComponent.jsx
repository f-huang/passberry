import React from "react";
import PropTypes from "prop-types";
import { compose, Query, withApollo } from "react-apollo";
import { connect } from "react-redux";
import { setTicket } from "../scanActions";
import {
	GET_TICKET_BY_TRAVELER_ID_AND_ACTIVITY_ID,
	UPDATE_SCAN_STATE
} from "../../../queries";
import EnumScanState from "../EnumScanState";

const getScanState = (ticket) => {
	if (ticket === null)
		return EnumScanState.NOT_FOUND;
	else if (ticket.usedTime !== null)
		return EnumScanState.ALREADY_USED;
	else
		return EnumScanState.SUCCESS;
};

const updateScan = (client, state, scanId) => {
	client.mutate({
		mutation: UPDATE_SCAN_STATE,
		variables: {
			input: {
				id: scanId,
				state: state.value
			}
		}
	});
};


const QueryTicketComponent = ({ traveler, activityId, scanId, client }) => {
	const variables = {
		travelerId: traveler.id,
		activityId: activityId
	};
	return (
		<Query query={ GET_TICKET_BY_TRAVELER_ID_AND_ACTIVITY_ID }
		       variables={ variables }>
			{ ({ loading, error, data }) => {
				if (loading) return <p>Loading</p>;
				if (error) return <p>Error</p>;

				const ticket = data.getTicketByTravelerIdAndActivityId;
				const state = getScanState(ticket);
				updateScan(client, state, scanId);
				if (state === EnumScanState.NOT_FOUND)
					return <p>Ticket not found</p>;
				else if (state  === EnumScanState.ALREADY_USED)
					return <p>Ticket already used</p>;
				else if (state === EnumScanState.SUCCESS)
					return <p>{ticket.id} @ {ticket.activityId}</p>
			}}
		</Query>
	);
};


QueryTicketComponent.propTypes = {
	scanId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	traveler: state.scan.traveler,
	activityId: 1,
	userId: 10
});

const mapDispatchToProps = dispatch => ({
	setTicket: (ticket) => dispatch(setTicket({ ticket }))
});


const withOptions = compose(
	withApollo,
	connect(mapStateToProps, mapDispatchToProps)
);


export default withOptions(QueryTicketComponent);