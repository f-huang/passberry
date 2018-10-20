import React from "react";
import moment from "moment";
import EnumEntryState from "../EnumEntryState";

import { Mutation } from "react-apollo";
import { connect } from "react-redux";
import { CREATE_ENTRY } from "../../../queries";
import { withRouter } from "react-router-dom";

import Button from "../../../component/Button/Button";

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

const ValidateEntryButton = (props) => (
	<Mutation mutation={ CREATE_ENTRY }
	          update={() => { onValidate(props);}}
	>
		{ (mutate) => { return (
			<Button onClick={e => onClick(e, props, mutate)}>
				{"Valider"}
			</Button>
		)}}
	</Mutation>
);

const mapStateToProps = state => {
	return ({
		userId: 10,
		activityId: 1
	})
};

export default withRouter(connect(mapStateToProps)(ValidateEntryButton));