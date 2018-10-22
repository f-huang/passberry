import React from "react";
import styled from "styled-components";
import moment from "moment";
import EnumEntryState from "../EnumEntryState";

import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import {BURN_ACTIVITY_TICKET, CREATE_ENTRY} from "../../../queries";
import { withRouter } from "react-router-dom";

import Button from "../../../component/Button/Button";
import getScanState from "./getScanState";
import EnumScanState from "../EnumScanState";
import theme from "../../../app/theme";

const ValidateButton = styled(Button)`
	width: 60%;
	&:disabled {
		background-color: ${theme.lightGrey};
		border-color: ${theme.lightGrey};
		cursor: none;
	}
`;

const onValidate = (props) => {
	props.history.push('/scan-profile');
};

const timestamp =  moment().format('YYYY-MM-DD hh:mm:ss');

const mutateEntry = (props) => {
	const variables = {
		variables : {
			input : {
				timestamp: timestamp,
				state: EnumEntryState.ACCEPTED.value,
				userId: props.userId,
				activityId: props.activityId,
				scanId: props.match.params.scanId
			}
		}
	};
	return props.createEntry(variables);
};

const mutateActivityTicket = (props) => {
	const variables = {
		variables : {
			input : {
				timestamp: timestamp,
				ticketId: props.ticket.id
			}
		}
	};
	return props.burnActivityTicket(variables);
};

const onClick = (e, props) => {
	e.preventDefault();

	Promise.all([
		mutateEntry(props),
		mutateActivityTicket(props)
	]).then(() =>
		onValidate(props)
	);
};

const ValidateEntryButton = (props) => {
	const state = getScanState(props.ticket);

	return (
		<ValidateButton onClick={e => onClick(e, props)} disabled={state !== EnumScanState.SUCCESS}>
			{"Valider"}
		</ValidateButton>
	);
};

const mapStateToProps = state => {
	return ({
		ticket: state.scan.ticket,
		userId: 10,
		activityId: 1
	})
};

const withOptions = compose(
	graphql(CREATE_ENTRY, { name: "createEntry" }),
	graphql(BURN_ACTIVITY_TICKET, { name: "burnActivityTicket" }),
	connect(mapStateToProps)
);

export default withRouter(withOptions(ValidateEntryButton));