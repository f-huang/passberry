import React from "react";
import { connect } from "react-redux";
import Button from "../../../component/Button/Button";
import ValidateEntryButton from "../component/ValidateEntryButton";
import QueryTicketComponent from "./QueryTicketComponent";
import QueryTravelerComponent from "./QueryTravelerComponent";
import Traveler from "./Traveler";

class ScannedProfileView extends React.Component {
	constructor(props) {
		super(props);
		this.scanId = this.props.match.params.scanId;
	}

	render() {
		const traveler = this.props.traveler;
		if (!traveler)
			return <QueryTravelerComponent scanId={this.scanId}/>;
		return (
			<div>
				<Traveler traveler={traveler} ticketPrice={this.props.ticket ? this.props.ticket.price : null}/>
				<QueryTicketComponent scanId={this.scanId}/>
				<Button>x</Button>
				<ValidateEntryButton/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	traveler: state.scan.traveler,
	ticket: state.scan.ticket
});

export default connect(mapStateToProps, null)(ScannedProfileView);