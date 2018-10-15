import React from "react";
import { connect } from "react-redux";
import { Query, withApollo, compose } from "react-apollo";
import { GET_TICKET_BY_TRAVELER_ID_AND_ATTRACTION_ID, UPDATE_SCAN_STATE } from "../../queries";
import EnumScanState from "./EnumScanState";
import Button from "../../component/Button/Button";
import ValidateEntryButton from "./component/ValidateEntryButton";

class ScannedProfileView extends React.Component {
	constructor(props) {
		super(props);
		this.scanId = this.props.match.params.scanId;
	}

	getScanState = (ticket) => {
		if (ticket === null)
			return EnumScanState.NOT_FOUND;
		else if (ticket.usedTime !== null)
			return EnumScanState.ALREADY_USED;
		else
			return EnumScanState.SUCCESS;
	};

	updateScan = (state) => {
		this.props.client.mutate({
			mutation: UPDATE_SCAN_STATE,
			variables: {
				input: {
					id: this.scanId,
					state: state.value
				}
			}
		});
	};

	render() {
		const traveler = this.props.traveler;
		return (
			<div>
				Scanned Profile
				<div>
					{traveler.firstName}
					{traveler.lastName}
				</div>
				<Query query={ GET_TICKET_BY_TRAVELER_ID_AND_ATTRACTION_ID }
				       variables={{ travelerId: this.props.traveler.id, attractionId: this.props.attractionId }}>
					{ ({ loading, error, data }) => {
						if (loading) return <p>Loading</p>;
						if (error) return <p>Error</p>;
						const ticket = data.getTicketByTravelerIdAndAttractionId;
						const state = this.getScanState(ticket);
						this.updateScan(state);
						if (state === EnumScanState.NOT_FOUND)
							return <p>Ticket not found</p>;
						else if (state  === EnumScanState.ALREADY_USED)
							return <p>Ticket already used</p>;
						else if (state === EnumScanState.SUCCESS)
							return <p>{ticket.id} @ {ticket.attractionId}</p>
					}}
				</Query>
				<Button>x</Button>
				<ValidateEntryButton/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return ({
		traveler: state.scan.traveler,
		attractionId: 1,
		userId: 10
	})
};

const withOptions = compose(
	withApollo,
	connect(mapStateToProps)
);

export default withOptions(ScannedProfileView);