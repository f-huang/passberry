import React from "react";
import styled from "styled-components";
import moment from "moment";
import EnumEntryState from "../EnumEntryState";

import { Mutation } from "react-apollo";
import { connect } from "react-redux";
import { CREATE_ENTRY } from "../../../queries";
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

const onClick = (e, props, mutate) => {
	const variables = {
		variables : {
			input : {
				timestamp: moment().format('YYYY-MM-DD hh:mm:ss'),
				state: EnumEntryState.ACCEPTED.value,
				userId: props.userId,
				activityId: props.activityId,
				scanId: props.match.params.scanId
			}
		}
	};
	e.preventDefault();
	mutate(variables);
};

const ValidateEntryButton = (props) => {
	const state = getScanState(props.ticket);

	return (
		<Mutation mutation={ CREATE_ENTRY }
	                  update={() => { onValidate(props);}}
		>
			{ (mutate) => { return (
				<ValidateButton onClick={e => onClick(e, props, mutate)} disabled={state !== EnumScanState.SUCCESS}>
					{"Valider"}
				</ValidateButton>
			)}}
		</Mutation>
	);
};

const mapStateToProps = state => {
	return ({
		ticket: state.scan.ticket,
		userId: 10,
		activityId: 1
	})
};

export default withRouter(connect(mapStateToProps)(ValidateEntryButton));